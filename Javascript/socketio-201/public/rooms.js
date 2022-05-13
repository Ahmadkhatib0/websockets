var socket = io.connect("http://localhost:9000"); // the / namespace
var socket2 = io.connect("http://localhost:9000/admin"); // the admin namespace

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

socket.on("joined", (msg) => {
  console.log(msg);
});
