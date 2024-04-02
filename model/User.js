const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
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
  password: {
    type: String,
    required: true,
    minlenght: 6
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);