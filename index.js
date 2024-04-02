const connectToDB = require("./connection");
const express = require("express");
const dotenv = require("dotenv");
var cors = require('cors');

// Connect to the database
connectToDB();

// Initialize express
const app = express();

// Set the port
const port = process.env.PORT;

// Initialize middleware
app.use(express.json());

app.use(cors());


// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/api/v1/keeplive', (req, res) => {
  res.send('Keep Live API!')
})

// Available routes

// @route   GET

// @desc    Get user by token
app.use("/api/v1/user", require("./routes/user"));

// @route   POST

// @desc    Contact Us
app.use("/api/v1/contact", require("./routes/contact"));

// @desc    Register user
app.use("/api/v1/register", require("./routes/register"));

//@desc     Login user
app.use("/api/v1/login", require("./routes/login"));

//@desc Payment Link

app.use("/api/v1/create-payment-link", require("./routes/paymentlink"));