const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatController");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth)

// POST /api/chats
router.post("/", accessChat);

// GET /api/chats
router.get("/", fetchChats);

// POST /api/chats/group
router.post("/group", createGroupChat);

// PUT /api/chats/rename
router.put("/rename", renameGroup);

// PUT /api/chats/groupremove
router.put("/groupremove", removeFromGroup);

// PUT /api/chats/groupadd
router.put("/groupadd", addToGroup);

module.exports = router;
