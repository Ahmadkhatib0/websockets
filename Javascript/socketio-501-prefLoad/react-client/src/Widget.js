import React, { Component } from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import "./widget.css";

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

    const cpuWidgetId = `cpu-widget-${macA}`;
    const memWidgetId = `mem-widget-${macA}`;

    const cpu = { cpuLoad, cpuWidgetId };
    const mem = { totalMem, freeMem, usedMem, memUsage, memWidgetId };
    const info = {
      macA,
      osType,
      upTime,
      cpuModel,
      numCores,
      cpuSpeed,
      isActive,
    };

    let notActiveDiv = "";
    if (!isActive) notActiveDiv = <div className="not-active"> Offline </div>;

    return (
      <div className="mt-3 widget row">
        {notActiveDiv}
        <Cpu cpuData={cpu} />
        <Mem memData={mem} />
        <Info infoData={info} />
      </div>
    );
  }
}

export default Widget;
