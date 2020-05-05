import React from "react";
import "./Nav.css";

const Brand = (props) => {
  const logo =
    props.darkTheme === "ON"
      ? "../../img/instagram-white.png"
      : "../../img/instagram.png";

  return (
    <div className="nav-brand">
      <a href="/">
        <div className="nav-brand-link">
          <div className="nav-brand-logo">
            <img alt="Instagram" src={logo} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Brand;
