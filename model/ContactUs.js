const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlenght: 3,
    maxlength: 150
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlenght: 10,
    maxlength: 150
  },
  mobile: {
    type: Number,
    require: true,
    unique: true,
    minlenght: 10,
    maxlength: 15
  },
  services: {
    type: String,
    require: true
  },
  message: {
    type: String
  },
  status: {
    type: String,
    default: "open"
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Leads', ContactSchema);