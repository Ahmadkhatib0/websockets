const express = require("express");
const app = express();
const { Server } = require("socket.io");
let namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

const io = new Server(expressServer);
io.on("connection", (socket) => {
  // console.log(socket.handshake);
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
    const username = nsSocket.handshake.query.username;

    // console.log(`${nsSocket.id} has joined the ${namespace.endpoint}`);
    nsSocket.emit("nsRoomLoad", namespace.rooms);
    nsSocket.on("joinRoom", async (roomToJoin, numberOfUsersCallback) => {
      const roomToLeave = [...nsSocket.rooms.keys()][1];
      nsSocket.leave(roomToLeave);
      updateUsersInRoom(namespace, roomToLeave);
      nsSocket.join(roomToJoin);
      // const clients = await io.of("/wiki").in(roomToJoin).allSockets(); //get users in room
      // numberOfUsersCallback(Array.from(clients).length);
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle == roomToJoin.trim();
      });
      nsSocket.emit("historyCatchUp", nsRoom.history);
      updateUsersInRoom(namespace, roomToJoin);
    });

    nsSocket.on("newMessageToServer", (msg) => {
      const fullMessage = {
        text: msg.text,
        time: Date.now(),
        username: username,
        avatar: "https://via.placeholder.com/30",
      };
      // the user will be in the 2nd room in the object list, because socket is ALWAYS
      // join its onw room on connection
      const roomTitle = [...nsSocket.rooms.keys()][1];
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTitle.trim();
      });
      nsRoom.addMessage(fullMessage);
      io.of(namespace.endpoint)
        .to(roomTitle)
        .emit("messageToClients", fullMessage);
    });
  });
});

async function updateUsersInRoom(namespace, roomToJoin) {
  const usersNumber = (
    await io.of(namespace.endpoint).in(roomToJoin).allSockets()
  ).size;
  io.of(namespace.endpoint).in(roomToJoin).emit("updateMembers", usersNumber);
}
