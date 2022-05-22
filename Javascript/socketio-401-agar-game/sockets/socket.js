const io = require("../server").io;
const Orb = require("./classes/Orb");
const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");

let orbs = [];
let settings = {
  defaultOrbs: 500,
  defaultSpeed: 6,
  defaultSize: 6,
  // as player gets bigger, the zoom needs to go out
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeigh: 500,
};

initGame();
io.on("connection", (socket) => {
  // this what is server needs to know about player
  let playerConfig = new PlayerConfig(settings);
  // this what is everyone needs to know about player
  let playerData = new PlayerData(null, settings);
  // this class if both of them
  let player = new Player(socket.id, playerConfig, playerData);
  socket.emit("init", {
    orbs,
  });
});

function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
