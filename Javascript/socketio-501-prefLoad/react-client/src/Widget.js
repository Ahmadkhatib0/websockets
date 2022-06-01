import React, { Component } from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";

class Widget extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
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
      macA,
    } = this.props.data;
    const cpu = { cpuLoad };
    const mem = { totalMem, freeMem, usedMem, memUsage };
    const info = {
      macA,
      osType,
      upTime,
      cpuModel,
      numCores,
      cpuSpeed,
      isActive,
    };
    return (
      <div>
        <Cpu cpuData={cpu} />
        <Mem memData={mem} />
        <Info infoData={info} />
      </div>
    );
  }
}

export default Widget;
