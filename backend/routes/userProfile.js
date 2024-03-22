const express = require("express");
const upload = require("../middleware/profileMulterMiddleware");
const path = require("path");
const requireAuth = require("../middleware/requireAuth");

// Controller functions
const {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  addTagToUserProfile,
  removeTagFromUserProfile,
} = require("../controllers/userProfileController");

const router = express.Router();

// Serve avatar images
router.get("/uploads/profilePictures/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.resolve(`uploads/profilePictures/${filename}`));
});
// requireAuth middleware is used to protect the routes
router.use(requireAuth);

// User Profile Route
router.get("/:userId", getUserProfile);

// Create User Profile Route with avatar upload
router.post("/:userId", upload.single("avatar"), createUserProfile);

// Update User Profile Route with avatar upload
router.patch("/:userId", upload.single("avatar"), updateUserProfile);

// Add Tag to User Profile Route
router.patch("/:userId/addTag", addTagToUserProfile);

// Remove Tag from User Profile Route
router.patch("/:userId/removeTag", removeTagFromUserProfile);


module.exports = router;
