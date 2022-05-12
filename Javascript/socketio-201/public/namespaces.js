var socket = io.connect("http://localhost:9000"); // the / namespace
var socket2 = io.connect("http://localhost:9000/admin"); // the admin namespace

socket.on("connect", () => {
  console.log("/ namespace socket id: " + socket.id);
});
socket2.on("connect", () => {
  console.log("admin namespace socket id: " + socket2.id);
});

socket.on("messageFromServer", (data) => {
  console.log(data);
});

socket.emit("messageToServer", {
  data: "this message from the client to the chat server",
});

socket2.on("welcome", (message) => {
  console.log(message);
});

window.document
  .querySelector("#message-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const newMessage = document.querySelector("#user-message").value;
    socket.emit("newMessageToServer", { text: newMessage });
    console.log(newMessage);
  });

socket.on("messageToClients", (message) => {
  const ul = document.querySelector("#messages");
  const li = document.createElement("li");
  li.innerText = message.text;
  ul.appendChild(li);
});
