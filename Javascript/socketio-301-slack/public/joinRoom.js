function joinRoom(roomName) {
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`;
  });

  nsSocket.on("historyCatchUp", (history) => {
    const messagesUL = document.querySelector("#messages");
    messagesUL.innerHTML = "";
    history.forEach((msg) => {
      const newMsg = buildHTML(msg);
      messagesUL.innerHTML += newMsg;
      // this way it will build from top down, rather than bottom up
    });
    messagesUL.scrollTo(0, messagesUL.scrollHeight);
  });

  nsSocket.on("updateMembers", (number) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${number} <span class="glyphicon glyphicon-user"></span>`;
    document.querySelector(".curr-room-text").innerText = `${roomName}`;
  });

  let searchBox = document.querySelector("#search-box");
  searchBox.addEventListener("input", (e) => {
    let messages = Array.from(document.getElementsByClassName("message-text"));
    messages.forEach((msg) => {
      if (
        msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1
      )
        msg.style.display = "none";
      else msg.style.display = "block";
    });
  });
}
