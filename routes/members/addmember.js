const express = require("express");
const routes = express.Router();
const Members = require("../../model/Member");
const fetchUser = require("../../middleware/fetchUser");
const imageUpload = require("../../utility/imageUpload");
const upload = require('../../utility/upload');

routes.post("/", fetchUser, upload.array('profile', 5), async (req, res) => {
  const { name, birthDate, deathDate, shortInfo, qrSite, services } = req.body;
  
  try {
    // Get the user from the request object
    const userData = req.user;

    // Process uploaded images if they exist
    let responseImages = [];
    if (req.files && req.files.length > 0) {
      responseImages = await imageUpload(userData, req.files);
    }

    // Create an array of image objects
    const images = responseImages.map(image => ({
      type: 'profile', // Set the type of image as needed
      url: image.url
    }));
    
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