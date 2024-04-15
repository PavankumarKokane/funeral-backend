const fs = require('fs');

const imageUpload = async (userData, files, type) => {
    const userID = userData;
    try {
      const uploadedImages = [];
  
      // Loop through uploaded files and create an array of image objects
      for (const file of files) {
        const imageUrl = `/uploads/${userID}/${type}` + file.filename;
        uploadedImages.push({ type: type, url: imageUrl }); // Set type here
      }
  
      // Return the array of image objects
      return uploadedImages;

    } catch (error) {
      console.error(error);
      throw new Error('Error uploading images');
    }
}

module.exports = imageUpload;