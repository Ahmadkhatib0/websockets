function joinNs(endpoint) {
  nsSocket = io(`http://localhost:9000/${endpoint}`);
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
    // add user automatically, at first time here
    const topRoom = document.querySelector(".room");
    const topRoomName = topRoom.innerText;
    joinRoom(topRoomName);
  });

  nsSocket.on("messageToClients", (message) => {
    const newMessage = buildHTML(message);
    console.log(newMessage);
    document.querySelector("#messages").innerHTML += newMessage;
  });
  window.document
    .querySelector("#user-input")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const newMessage = document.querySelector("#user-message").value;
      nsSocket.emit("newMessageToServer", { text: newMessage });
      console.log(newMessage);
    });
}

function buildHTML(msg) {
  const convertedTime = new Date(msg.time).toLocaleString();
  const newHTML = `
  <li>
      <div class="user-image">
        <img src="${msg.avatar}" />
      </div>
      <div class="user-message">
        <div class="user-name-time" > ${msg.username} <span>${convertedTime} </span></div>
        <div class="message-text"> ${msg.text} </div>
      </div>
</li>
  `;
  return newHTML;
}
