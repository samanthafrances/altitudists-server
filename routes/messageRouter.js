const express = require("express");
const { allMessages, sendMessage } = require("../controllers/message");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/:chatId", protect, (req, res) => {
  allMessages(req, res);
});

router.post("/", protect, (req, res) => {
  sendMessage(req, res);
});

module.exports = router;