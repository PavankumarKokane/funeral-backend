const express = require("express");
const router = express.Router();
const Contact = require("../model/ContactUs");

// @route   POST api/v1/contact
// @desc    Add an inquiry
router.post("/", async (req, res) => {
    try {
        const { name, email, mobile, services, message } = req.body;

        // Validate the request body
        if (!name || !email || !mobile || !services) {
            return res.status(400).json({ success: false, error: "Please provide all required fields: name, email, mobile, services" });
        }

        // Check if the email or mobile already exists in the database
        const existingContact = await Contact.findOne({ $or: [{ email }, { mobile }] });
        if (existingContact) {
            return res.status(400).json({ success: false, error: "Email or mobile number already exists" });
        }

        // Create a new contact
        const newContact = new Contact({
            name,
            email,
            mobile,
            services,
            message
        });

        // Save the contact to the database
        await newContact.save();

        // Respond with success message
        res.status(201).json({ success: true, message: "Inquiry added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

module.exports = router;