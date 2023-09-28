const Message = require("../models/Message");

exports.sendMessage = (data) => {
  const message = new Message(data);
  return message.save();
};

exports.getMessages = () => {
  return Message.find().sort({ createdAt: "asc" });
};
