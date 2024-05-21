const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chat");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, (req, res) => {
  accessChat(req, res);
});
router.get("/", protect, (req, res) => {
  fetchChats(req, res);
});
router.post("/group", protect, (req, res) => {
  createGroupChat(req, res);
});
router.put("/rename", protect, (req, res) => {
  renameGroup(req, res);
});
router.put("/groupremove", protect, (req, res) => {
  removeFromGroup(req, res);
});
router.put("/groupadd", protect, (req, res) => {
  addToGroup(req, res);
});

module.exports = router;