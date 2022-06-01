import React from "react";
import drawCircle from "./utilities/canvasLoadAnimation";

function Cpu(props) {
  const canvas = document.querySelector(
    `.${props.cpuData.cpuWidgetId.split(":").join("")}`
  );
  drawCircle(canvas, props.cpuData.cpuLoad);
  return (
    <div className="col-sm-3 cpu">
      <h3> cpu load</h3>
      <div className="canvas-wrapper">
        <canvas
          className={props.cpuData.cpuWidgetId.split(":").join("")}
          width="200"
          height="200"
        ></canvas>
        <div className="cpu-text"> {props.cpuData.cpuLoad}% </div>
      </div>
    </div>
  );
}

export default Cpu;
