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

// Auth API

// @desc    POST Register user
app.use("/api/v1/register", require("./routes/auth/register"));
//@desc     POST Login user
app.use("/api/v1/login", require("./routes/auth/login"));


// @desc    GET user by token
app.use("/api/v1/user", require("./routes/users/user"));


// Contact US Form API

// @desc    POST Contact Us
app.use("/api/v1/contact", require("./routes/contact"));


// Members API

app.use("/api/v1/addmember", require("./routes/members/addmember"));



//@desc POST Payment Link
app.use("/api/v1/create-payment-link", require("./routes/payment/paymentlink"));