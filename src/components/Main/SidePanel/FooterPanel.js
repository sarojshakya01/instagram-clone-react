import React from "react";
import "./SidePanel.css";

const FooterPanel = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer-panel">
      <nav className="dark-need">
        <ul>
          <li>
            <a
              href="/about-us/"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              {"About"}
            </a>
          </li>
          <li>
            <a href="/help/">{"Help"}</a>
          </li>
          <li>
            <a href="/developer/">{"API"}</a>
          </li>
          <li>
            <a href="/jobs/">{"Jobs"}</a>
          </li>
          <li>
            <a href="/privacy/">{"Privacy"}</a>
          </li>
          <li>
            <a href="/terms/">{"Terms"}</a>
          </li>
          <li>
            <a href="/locations/">{"Locations"}</a>
          </li>
          <li>
            <a href="/profiles/">{"Top Accounts"}</a>
          </li>
          <li>
            <span className="language">
              {"Language"}
              <select>
                <option value="en">{"English"}</option>
                <option value="ne">{"नेपाली"}</option>
              </select>
            </span>
          </li>
        </ul>
      </nav>
      <span className="copyright">
        {"© " + year + " Instagram from Saroj Shakya"}
      </span>
    </div>
  );
};

export default FooterPanel;
