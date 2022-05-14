var socket = io.connect("http://localhost:9000");

socket.on("nsList", (nsData) => {
  let nameSpaceDiv = document.querySelector(".namespaces");
  nameSpaceDiv.innerHtml = "";
  nsData.forEach((ns) => {
    nameSpaceDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" /></div>`;
  });
  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      // array from is to convert the "html like array collection" to an actual array
      element.addEventListener("click", (e) => {
        const nsEndpoint = element.getAttribute("ns");
      });
    }
  );
});

window.document
  .querySelector("#user-input")
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
