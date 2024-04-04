const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  images: [{
    type: {
      type: String,
      enum: ['gallery', 'profile'],
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }],  
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150
  },
  birthDate : {
    type: Date
  },
  deathDate : {
    type: Date
  },
  shortInfo : {
    type: String
  },
  qrSite : {
    type : Boolean
  },
  services : {
    type: [String]
  },
  date: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Members', UserSchema);