import React from "react";

const Arrow = ({ direction, click }) => (
  <div className={`slide-arrow slide-arrow-${direction}`} onClick={click}>
    <div className={`slide-arrow-icon slide-arrow-icon-${direction}`}></div>
  </div>
);

export default Arrow;
