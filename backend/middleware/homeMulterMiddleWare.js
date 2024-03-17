const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profilePictures'); // Destination folder where the images will be stored
  },
  filename: function (req, file, cb) {
    // Get the userId from the request parameters
    const userId = req.params.userId;
    // Construct the filename with pp_ prefix, userId, and original file extension
    const filename = `pp_${userId}_${Date.now()}${getFileExtension(file.originalname)}`;
    cb(null, filename); // Use the custom filename
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept image files only
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

// Get file extension from the original filename
const getFileExtension = (filename) => {
  return '.' + filename.split('.').pop();
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
