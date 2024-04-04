const express = require("express");
const { check, validationResult } = require("express-validator");
const routes = express.Router();
const User = require("../../model/User");
const fetchUser = require("../../middleware/fetchUser");

// @route   GET api/v1/user
// @desc    Get user by token

routes.get("/", fetchUser, async (req, res) => {

  try {

    // get the user from the request object
    const userData = req.user;

    console.log("user: ", userData);

    // get the user from the database
    const user = await User.findById(userData).select("-password");

    // return the user
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: [{ message: "Invalid token" }] });
  }
});

module.exports = routes;