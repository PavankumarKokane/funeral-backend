const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const connectionURL = process.env.DB_URL;
const connectToDB = async () => {
    mongoose.connect(connectionURL);
    const connection = mongoose.connection;
    connection.on('connected', function () {
        console.log("Connected to DB");
    });
    connection.on("error", (err) => {
        console.error(`connection error: ${err}`);
    });
}

module.exports = connectToDB;