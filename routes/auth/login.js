const express = require("express");
const { check, validationResult } = require("express-validator");
const routes = express.Router();
const User = require("../model/User");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
// @route   POST api/v1/login
// @desc    Login user

routes.post(
  "/",
  // express-validator middleware
  [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").exists().withMessage("Password is required"),
  ], 
  async (req, res) => {
    // console the request body
    console.log("req.body: ", req.body);

    // check if there are any errors
    const errors = validationResult(req);

    // if there are errors, return the errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check if the user already exists
    const userData = await User.findOne({ email: req.body.email });

    try {

      // if the user exists, return an error
      if (userData) {

        // compare the password
        const isPasswordMatch = await bcrypt.compare(req.body.password, userData.password);

        // if the password doesn't match, return an error
        if (!isPasswordMatch) {
          return res.status(400).json({success: false, errors: [{ message: "Invalid credentials" }] });
        }

        // create a token
        const token = jwt.sign({ _id: userData._id }, jwtSecret);

        // return a success message
        res.status(200).json({ success: true, token: token });

      } else {

        // return an error message
        return res
          .status(400)
          .json({ success: false, errors: [{ message: "Invalid credentials" }] });

      }
    } catch (error) {
      // return an error message
      console.error("error: ", error);

      // return a server error
      res.status(500).json({ errors: [{ message: "Internal Server Error" , error: error }] });
    }
  }
);

module.exports = routes;
