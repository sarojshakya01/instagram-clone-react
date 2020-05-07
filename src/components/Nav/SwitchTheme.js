import React from "react";
import "./Nav.css";

const SwitchTheme = (props) => {
  let style = { top: "0" };
  if (window.innerWidth < 1056) {
    style = { top: "56px" };
  }

  return (
    <div className="switch" style={style}>
      <span className="inner-switch" onClick={props.changeTheme}>
        {"Dark " + props.label}
      </span>
    </div>
  );
};

export default SwitchTheme;
