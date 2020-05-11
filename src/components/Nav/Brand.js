import React from "react";

const Brand = (props) => {
  let logo;
  let style = { width: "100%", height: "100%", margin: "0 0 0 0" };

  if (window.innerWidth > 604) {
    logo =
      props.darkTheme === "ON"
        ? "../../img/instagram-white.png"
        : "../../img/instagram.png";
  } else {
    logo =
      props.darkTheme === "ON"
        ? "../../img/instagram-logo-black.png"
        : "../../img/instagram-logo.png";
    style = { width: "11%", height: "11%", margin: "0 0 8px 0" };
  }

  return (
    <div className="nav-brand">
      <a href="/">
        <div className="nav-brand-link">
          <div className="nav-brand-logo">
            <img style={style} alt="Instagram" src={logo} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Brand;
