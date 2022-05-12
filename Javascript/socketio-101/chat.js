const express = require("express");
const app = express();
const { Server } = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

const io = new Server(expressServer);
io.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "hey from the chat server" });
  socket.on("messageToServer", (message) => {
    console.log(message);
  });
  socket.on("newMessageToServer", (message) => {
    console.log(message);
    socket.emit("messageToClients", { text: message.text });
  });
});
