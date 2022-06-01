import React from "react";
import drawCircle from "./utilities/canvasLoadAnimation";

function Mem(props) {
  const { totalMem, freeMem, usedMem, memUsage } = props.memData;
  const canvas = document.querySelector(
    `.${props.memData.memWidgetId.split(":").join("")}`
  );
  const totalMemInGb = Math.floor((totalMem / 1073741824) * 100) / 100;
  const freeMemInGb = Math.floor((freeMem / 1073741824) * 100) / 100;
  drawCircle(canvas, memUsage * 100);
  return (
    <div className="col-sm-3 mem">
      <h3>memory usage</h3>
      <div className="canvas-wrapper">
        <canvas
          className={props.memData.memWidgetId.split(":").join("")}
          width="200"
          height="200"
        ></canvas>
        <div className="mem-text">{memUsage * 100}%</div>
      </div>
      <div> Total memory {totalMemInGb} GB </div>
      <div> Free memory {freeMemInGb} GB </div>
    </div>
  );
}

export default Mem;
