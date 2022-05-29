const mongoose = require("mongoose");
const Machine = require("./models/Machine");
mongoose.connect("mongodb://127.0.0.1/perfData", { useNewUrlParser: true });

function socketMain(io, socket) {
  let macA;
  socket.on("clientAuth", (key) => {
    if (key == "dfldfslkjdslfdsdf") {
      // valid node client has joined
      socket.join("clients");
    } else if (key == "kldfklfdlkdl") {
      //valid ui client has joined
      socket.join("ui");
    } else socket.disconnect(true);
  });

  socket.on("initPerfData", async (data) => {
    macA = data.macA;
    const mongooseResponse = await checkAndAdd(data);
    console.log(mongooseResponse);
  });

  socket.on("perfData", (data) => {
    console.log(data);
  });
}

function checkAndAdd(data) {
  return new Promise((resolve, reject) => {
    Machine.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        throw err;
        reject(err);
      } else if (doc === null) {
        //  the record is not in the db  , so add it
        let newMachine = new Machine(data);
        newMachine.save();
        resolve("added");
      } else {
        resolve("found");
      }
    });
  });
}

module.exports = socketMain;
