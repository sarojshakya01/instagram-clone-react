import React from "react";
import "./Nav.css";

const SwitchTheme = (props) => {
  return (
    <div className="switch">
      <span className="inner-switch" onClick={props.changeTheme}>
        {"Dark " + props.label}
      </span>
    </div>
  );
};

export default SwitchTheme;
