const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/profilePictures'); // Destination folder where the images will be stored
    },
    filename: function (req, file, cb) {
      // Get the userId from the request parameters
      const userId = req.params.userId;
      // Construct the filename with pp_ prefix and userId
      const filename = `pp_${userId}`;
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

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    onError: function(err, next) {
      console.error('Multer error:', err);
      next(err);
    },
    overwrite: true // Overwrite existing files with the same name
  });
  
  module.exports = upload;
