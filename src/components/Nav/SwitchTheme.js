import React from "react";
import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";

const SwitchTheme = (props) => {
  const { theme } = useContext(ThemeContext);

  let style = { top: "0" };
  if (window.innerWidth < 1056) {
    style = { top: "56px" };
  }

  return (
    <div className="switch" style={style}>
      <span className="inner-switch" onClick={props.changeTheme}>
        {"Theme " + theme}
      </span>
    </div>
  );
};

export default SwitchTheme;
