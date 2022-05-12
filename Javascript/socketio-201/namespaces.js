const express = require("express");
const app = express();
const { Server } = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

const io = new Server(expressServer);
// io.on()... is the same as io.of("/").on() ....
io.on("connection", (socket) => {
  socket.emit("messageFromServer", { data: "hey from the chat server" });
  socket.on("messageToServer", (message) => {
    console.log(message);
  });
  socket.on("newMessageToServer", (message) => {
    console.log(message);
    io.emit("messageToClients", { text: message.text });
    io.of("/").emit("messageToClients", { text: message.text }); //tow lines are =
  });
});

io.of("/admin").on("connection", (socket) => {
  console.log("Someone connected to the admin namespace");
  io.of("/admin").emit("welcome", "Welcome to the admin namespace");
});

// the server can communicate across multiple namespaces, but the client, the socket NEEDS
// be on THAT namespace in order to get that events sent
