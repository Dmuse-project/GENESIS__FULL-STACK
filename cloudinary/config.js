// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Configuring Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  
});

// Set up Cloudinary storage using Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Genesis',  // Folder in Cloudinary to store uploads
    allowed_formats: ['jpeg', 'png', 'jpg', 'gif'],
    format: async (req, file) => 'png', // Supports promises to set file format
    public_id: (req, file) => file.originalname.split('.')[0], // File name in Cloudinary
  },
  
});








module.exports = {
  cloudinary,
  storage,

};





