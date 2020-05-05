import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer dark-need" role="contentinfo">
      <div className="footer-inner">
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
            <li className="language">
              <span>
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
          {"© " + year + " Instagram by Saroj Shakya"}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
