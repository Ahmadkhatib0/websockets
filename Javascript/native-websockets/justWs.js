const http = require("http");
const webSocket = require("ws");

const server = http.createServer((req, res) => {
  res.end("iam connected");
});

const wss = new webSocket.Server({ server });

wss.on("headers", (headers, req) => {
  console.log(headers);
});

wss.on("connection", (ws, req) => {
  //   console.log(req);
  ws.send("welcome to the websocket server");
  ws.on("message", (msg) => {
    //   message is received as buffer
    console.log(msg.toString(), "message");
  });
});
server.listen(8000);
