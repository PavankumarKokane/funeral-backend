const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = (fieldname) => multer.diskStorage({
  destination: (req, file, cb) => {
    const userID = req.user; // Assuming user data is available in req.user
    const uploadDir = path.join(__dirname, `../uploads/${userID}/${fieldname}`);
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const uploadProfile = multer({
  storage: storage('profile'),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images with jpeg, jpg, png, or gif formats are allowed'));
    }
  }
});

const uploadGallery = multer({
  storage: storage('gallery'),
  fileFilter: (req, file, cb) => {
    console.log("file: ", file);
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images with jpeg, jpg, png, or gif formats are allowed'));
    }
  }
});

module.exports = { uploadProfile, uploadGallery };