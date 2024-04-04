const express = require("express");
const { check, validationResult } = require("express-validator");
const routes = express.Router();
const User = require("../model/User");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;
// @route   POST api/v1/register
// @desc    Register user

routes.post(
  "/",
  // express-validator middleware
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
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

        // return an error message
        return res
          .status(400)
          .json({success: false, errors: [{ message: "Email already exists" }] });

      } else {

        // generate a salt
        const salt = await bcrypt.genSalt(10);

        // hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create a new user
        const userData = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });

        // save the user to the database
        const savedUser = await userData.save();

        // create a token
        const token = jwt.sign({ _id: savedUser._id }, jwtSecret);

        // return the token to the client in the response
        res.status(201).json({ success: true, token: token });

      }
    } catch (error) {
      // return an error message
      console.error("error: ", error);

      // return a server error
      res.status(500).json({ success: false, errors: [{ message: "Internal Server Error" , error: error }] });
    }
  }
);

module.exports = routes;