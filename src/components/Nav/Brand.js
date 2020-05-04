import React from "react";
import "./Nav.css";

const Brand = () => {
  return (
    <div className="nav-brand">
      <a href="/">
        <div className="nav-brand-link">
          <div className="nav-brand-logo">
            <img alt="Instagram" src="../../img/instagram.png" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Brand;
