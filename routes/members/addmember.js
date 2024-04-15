const express = require("express");
const routes = express.Router();
const Members = require("../../model/Member");
const fetchUser = require("../../middleware/fetchUser");
const { uploadProfile } = require('../../utility/upload');


routes.post("/", fetchUser, uploadProfile.single('profile'), async (req, res) => {
  const { name, birthDate, deathDate, shortInfo, qrSite, services } = req.body;
  
  try {
    // Get the user from the request object
    const userData = req.user;

    // Create an array of image objects
    const file = req.file;
    const images = [{
      type : file.fieldname,
      url : `/uploads/${userData}/${file.fieldname}/` + file.filename
    }]; 
    
    // Create a new Member object
    const member = new Members({
      images: images.length > 0 ? images : null, // Assign uploaded image URLs here
      name,
      birthDate,
      deathDate,
      shortInfo,
      qrSite,
      services: services || [], // Default to an empty array if services are not provided
      user: userData,
    });

    // Check if the member already exists
    const memberExists = await Members.findOne({ name: name, user: userData });

    // If the member exists, return an error
    if (memberExists) {
      return res.status(400).json({
        success: false,
        errors: [{ message: "Member already exists" }],
      });
    }

    // Save the member to the database
    const savedMember = await member.save();

    // Return the member
    res.json(savedMember);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, errors: [{ message: "Error creating member" }] });
  }
});

module.exports = routes;