const express = require("express");
const router = express.Router();
// const messageController = require("../controllers/Message");
// const Message = require("./models/Message");

module.exports = (Message) => {
  router.post("/message", async (req, res) => {
    try {
      const { username, message } = req.body;
      const data = { username, message };
      const savedMessage = await messageController.sendMessage(data);
      res.json(savedMessage);
    } catch (error) {
      res.status(500).json({ error: "Error sending message" });
    }
  });

  router.get("/api/messages", async (req, res) => {
    try {
      const messages = await Message.find().sort({ createdAt: "asc" });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Error fetching messages" });
    }
  });

  return router;
};
