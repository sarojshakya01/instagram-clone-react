import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer dark-off" role="contentinfo">
      <div className="footer-inner">
        <nav className="dark-off">
          <ul>
            <li>
              <a
                href="https://about.instagram.com"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                {"About"}
              </a>
            </li>
            <li>
              <a href="https://help.instagram.com">{"Help"}</a>
            </li>
            <li>
              <a
                href="https://developers.facebook.com/docs/instagram"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                {"API"}
              </a>
            </li>
            <li>
              <a href="https://about.instagram.com/about-us/careers">{"Jobs"}</a>
            </li>
            <li>
              <a href="https://help.instagram.com/519522125107875/?maybe_redirect_pol=0">{"Privacy"}</a>
            </li>
            <li>
              <a href="https://help.instagram.com/581066165581870">{"Terms"}</a>
            </li>
            <li>
              <a href="https://www.instagram.com/explore/locations/">{"Locations"}</a>
            </li>
            <li>
              <a href="https://www.instagram.com/directory/profiles/">{"Top Accounts"}</a>
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
