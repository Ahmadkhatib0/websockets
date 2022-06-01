const os = require("os");
const io = require("socket.io-client");
let socket = io.connect("http://127.0.0.1:8181");

socket.on("connect", () => {
  //   console.log("connected");
  const nI = os.networkInterfaces();
  let macA;
  for (let key in nI) {
    if (!nI[key][0].internal) {
      if (nI[key][0].mac === "00:00:00:00:00:00")
        macA = Math.random().toString(36).substr(2, 15);
      else macA = nI[key][0].mac;
      break;
    }
  }

  socket.emit("clientAuth", "dfldfslkjdslfdsdf");

  performanceData().then((allPerformanceData) => {
    allPerformanceData.macA = macA;
    socket.emit("initPerfData", allPerformanceData);
  });

  let perfDataInterval = setInterval(() => {
    performanceData().then((allPerformanceData) => {
      //   console.log(allPerformanceData);
      allPerformanceData.macA = macA;
      socket.emit("perfData", allPerformanceData);
    });
  }, 1000);

  socket.on("disconnect", () => clearInterval(perfDataInterval));
});

function performanceData() {
  return new Promise(async (resolve, reject) => {
    const cpus = os.cpus();
    // What do we need to know from node about performance?
    // - CPU load (current)
    // - Memory Useage
    //  - free
    const freeMem = os.freemem();
    //  - total
    const totalMem = os.totalmem();
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;
    // - OS type
    const osType = os.type() == "Darwin" ? "Mac" : os.type();
    // - uptime
    const upTime = os.uptime();
    // - CPU info
    //  - Type
    const cpuModel = cpus[0].model;
    //  - Number of Cores
    const numCores = cpus.length;
    //  - Clock Speed
    const cpuSpeed = cpus[0].speed;
    const cpuLoad = await getCpuLoad();
    const isActive = true;
    resolve({
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      upTime,
      cpuModel,
      numCores,
      cpuSpeed,
      cpuLoad,
      isActive,
    });
  });
}

function cpuAverage() {
  const cpus = os.cpus();
  // redefine it to every time cpuAverage get called refresh the cpu data
  let idleMs = 0;
  let totalMs = 0;
  cpus.forEach((aCore) => {
    for (type in aCore.times) {
      totalMs += aCore.times[type];
    }
    idleMs += aCore.times.idle;
  });
  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}

// because the times property is time since boot, we will get now times, and 100ms from
//  now times. Compare them, that will  give us current Load
function getCpuLoad() {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;
      const percentageCpu =
        100 - Math.floor((100 * idleDifference) / totalDifference);
      resolve(percentageCpu);
    }, 100);
  });
}
