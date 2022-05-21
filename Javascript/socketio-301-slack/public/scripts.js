// var socket = io.connect("http://localhost:9000");
const username = prompt("what is you name?");
var socket = io.connect("http://localhost:9000", {
  query: {
    username: username,
  },
});
let nsSocket = "";
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
        joinNs(nsEndpoint);
      });
    }
  );
  // joinNs("wiki");
});
