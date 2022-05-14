function joinNs(endpoint) {
  const nsSocket = io(`http://localhost:9000/${endpoint}`);
  nsSocket.on("nsRoomLoad", (rooms) => {
    console.log(rooms);
    let roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";
    rooms.forEach((room) => {
      let glyph;
      if (room.privateRoom) glyph = "fa-solid fa-lock";
      else glyph = "fa-solid fa-earth-africa";
      roomList.innerHTML += `<li class="room"><i class="${glyph}">
      </i> ${room.roomTitle} </li>`;
    });

    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach((element) => {
      element.addEventListener("click", (e) => {});
    });
  });

  nsSocket.on("messageToClients", (message) => {
    const ul = document.querySelector("#messages");
    const li = document.createElement("li");
    li.innerText = message.text;
    ul.appendChild(li);
  });
  window.document
    .querySelector("#user-input")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const newMessage = document.querySelector("#user-message").value;
      socket.emit("newMessageToServer", { text: newMessage });
      console.log(newMessage);
    });
}
