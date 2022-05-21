const express = require("express");
const app = express();
const { Server } = require("socket.io");
let namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

const io = new Server(expressServer);
io.on("connection", (socket) => {
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  socket.emit("nsList", nsData);
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (nsSocket) => {
    console.log(`${nsSocket.id} has joined the ${namespace.endpoint}`);
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
    nsSocket.on("joinRoom", async (roomToJoin, numberOfUsersCallback) => {
      nsSocket.join(roomToJoin);
      const clients = await io.of("/wiki").in(roomToJoin).allSockets(); //get users in room
      console.log(Array.from(clients));
      numberOfUsersCallback(Array.from().length);
    });
    nsSocket.on("newMessageToServer", (msg) => {
      const fullMessage = {
        text: msg.text,
        time: Date.now(),
        username: "ahmad",
        avatar: "https://via.placeholder.com/30",
      };
      // the user will be in the 2nd room in the object list, because socket is ALWAYS
      // join its onw room on connection
      const roomTitle = [...nsSocket.rooms.keys()][1];
      io.of("/wiki").to(roomTitle).emit("messageToClients", fullMessage);
    });
  });
});
