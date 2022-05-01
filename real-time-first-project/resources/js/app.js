require("./bootstrap");

window.Echo.private("session-notifications").listen(
  "UserSessionChanged",
  (e) => {
    const notificationElement = document.getElementById("notification");
    console.log(notificationElement);
    console.log(e);
    notificationElement.innerText = e.message;

    notificationElement.classList.remove("invisible");
    notificationElement.classList.remove("alert-success");
    notificationElement.classList.remove("alert-danger");

    notificationElement.classList.add("alert-" + e.type);
  }
);
