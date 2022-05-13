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
  socket.join("level1");
  socket
    .to("level1")
    .emit("joined", `${socket.id} i've joined the level1 room`);
  socket.on("newMessageToServer", (message) => {
    io.emit("messageToClients", { text: message.text });
    io.of("/").emit("messageToClients", { text: message.text }); //tow lines are =
  });
});
