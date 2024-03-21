const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure that uploads/homes directory exists
    const uploadDir = 'uploads/homes';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Get the homeId from the request body
    const homeId = req.body.home_id;
    // Ensure that the home's directory exists
    const homeDir = `uploads/homes/${homeId}`;
    if (!fs.existsSync(homeDir)) {
      fs.mkdirSync(homeDir);
    }
    // Construct the filename with the original file name
    const filename = `${file.originalname}`;
    cb(null, filename); // Use the original filename
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept image files only
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

// Multer middleware for multiple file upload
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  onError: function(err, next) {
    console.error('Multer error:', err);
    next(err);
  },
  overwrite: true // Overwrite existing files with the same name
}).array('images', 5); // Allow uploading up to 5 files with the field name 'images'

module.exports = upload;
