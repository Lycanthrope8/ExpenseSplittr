const multer = require('multer');
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const homeId = req.body.home_id;
    const uploadDir = `uploads/homes/${homeId}`;
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const homeId = req.body.home_id;
    
    const homeDir = `uploads/homes/${homeId}`;
    if (!fs.existsSync(homeDir)) {
      fs.mkdirSync(homeDir);
    }
   
    const filename = `${file.originalname}`;
    cb(null, filename); 
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); 
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
  overwrite: true 
}).array('images', 5); 

module.exports = upload;
