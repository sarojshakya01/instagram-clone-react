import React from "react";
import "../Nav.css";

const exploreIcon =
  "M24 .5C37 .5 47.5 11 47.5 24S37 47.5 24 47.5.5 37 .5 24 11 .5 24 .5zm0 44c11.3 0 20.5-9.2 20.5-20.5S35.3 3.5 24 3.5 3.5 12.7 3.5 24 12.7 44.5 24 44.5zm-4.4-23.7c.3-.5.7-.9 1.2-1.2l14.8-8.1c.3-.1.6-.1.8.1.2.2.3.5.1.8l-8.1 14.8c-.3.5-.7.9-1.2 1.2l-14.8 8.1c-.3.1-.6.1-.8-.1-.2-.2-.3-.5-.1-.8l8.1-14.8zm6.2 5l4.3-7.8-7.8 4.3 3.5 3.5z";

const ExploreMenu = () => {
  return (
    <div className="nav-icon explore">
      <a href="/explore">
        <svg width="22" height="22" viewBox="0 0 48 48">
          <path d={exploreIcon}></path>
        </svg>
      </a>
    </div>
  );
};

export default ExploreMenu;
