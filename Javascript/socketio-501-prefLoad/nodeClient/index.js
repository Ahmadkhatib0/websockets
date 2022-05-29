const os = require("os");

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
    const memUseage = Math.floor((usedMem / totalMem) * 100) / 100;
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
      memUseage,
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

performanceData().then((allPerformanceData) => {
  console.log(allPerformanceData);
});
