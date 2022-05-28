const io = require("../server").io;
const checkForOrbCollisions =
  require("./checkCollisions").checkForOrbCollisions;
const checkForPlayerCollisions =
  require("./checkCollisions").checkForPlayerCollisions;
const Orb = require("./classes/Orb");
const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");

let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 50,
  defaultSpeed: 6,
  defaultSize: 6,
  // as player gets bigger, the zoom needs to go out
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
};

initGame();
setInterval(() => {
  if (players.length > 0) {
    io.to("game").emit("tock", {
      players,
    });
  }
}, 33);

io.on("connection", (socket) => {
  let player = {};
  socket.on("init", (data) => {
    socket.join("game");
    // this what is server needs to know about player
    let playerConfig = new PlayerConfig(settings);
    // this what is everyone needs to know about player
    let playerData = new PlayerData(data.playerName, settings);
    // this class if both of them
    player = new Player(socket.id, playerConfig, playerData);
    setInterval(() => {
      socket.emit("tickTock", {
        playerX: player.playerData.locX,
        playerY: player.playerData.locY,
      });
    }, 33);
    socket.emit("initReturn", { orbs });
    players.push(playerData);
  });

  // the client sent over a tick. That means we know what direction to move the socket
  socket.on("tick", (data) => {
    speed = player.playerConfig.speed;
    // update the playerConfig object with the new direction in data
    // and at the same time create a local variable for this callback for readability
    xV = player.playerConfig.xVector = data.xVector;
    yV = player.playerConfig.yVector = data.yVector;

    if (
      (player.playerData.locX < 5 && player.playerData.xVector < 0) ||
      (player.playerData.locX > settings.worldWidth && xV > 0)
    ) {
      player.playerData.locY -= speed * yV;
    } else if (
      (player.playerData.locY < 5 && yV > 0) ||
      (player.playerData.locY > settings.worldHeight && yV < 0)
    ) {
      player.playerData.locX += speed * xV;
    } else {
      player.playerData.locX += speed * xV;
      player.playerData.locY -= speed * yV;
    }
    let capturedOrb = checkForOrbCollisions(
      player.playerData,
      player.playerConfig,
      orbs,
      settings
    );
    capturedOrb
      .then((data) => {
        const orbData = { orbIndex: data, newOrb: orbs[data] };
        io.sockets.emit("updateLeaderBoard", getLeaderBoard);
        io.sockets.emit("orbSwitch", orbData);
      })
      .catch(() => {});
    let playerDeath = checkForPlayerCollisions(
      player.playerData,
      player.playerConfig,
      players,
      player.socketId
    );
    playerDeath
      .then((data) => {
        io.sockets.emit("updateLeaderBoard", getLeaderBoard);
        io.sockets.on("playerDeath", data);
      })
      .catch(() => {
        // console.log("no collision");
      });
  });

  socket.on("disconnect", (data) => {
    if (player.playerData) {
      players.forEach((currPlayer, i) => {
        if (currPlayer.uid == player.playerData.uid) {
          players.splice(i, 1);
          io.sockets.emit("updateLeaderBoard", getLeaderBoard);
        }
      });
      const updateStats = `
      UPDATE stats
      SET highScore = CASE WHEN highScore < ? THEN ? ELSE highScore END,
      mostOrbs = CASE WHEN mostOrbs < ? THEN ? ELSE mostOrbs END,
      mostPlayers = CASE WHEN mostPlayers < ? THEN ? ELSE mostPlayers END
      WHERE username = ?
      `;
    }
  });
});

function getLeaderBoard() {
  players.sort((a, b) => {
    return b.score - a.score;
  });
  let leaderBoard = players.map((currPlayer) => {
    return {
      name: currPlayer.name,
      score: currPlayer.score,
    };
  });
  return leaderBoard;
}

function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
