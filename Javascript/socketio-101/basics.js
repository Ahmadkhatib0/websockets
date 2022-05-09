const http = require("http");
const fs = require("fs");
const path = require("path");

const { Server } = require("socket.io");

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, "message.html");
  var stat = fs.statSync(filePath);
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": stat.size,
  });
  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

const io = new Server(server);
io.on("connection", (socket) => {
  socket.emit("welcome", "welcome to the websocket");
  socket.on("message", (msg) => {
    console.log(msg);
  });
});
server.listen(3000);
