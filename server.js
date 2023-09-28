const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const apiRoutes = require("./src/routes/api");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(process.env.mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Message = require("./src/models/Message");

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", (data) => {
    const message = new Message(data);
    messageController.sendMessage(data).then((savedMessage) => {
      io.emit("message", savedMessage);
    });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.json());

app.use("/api", apiRoutes(Message));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
