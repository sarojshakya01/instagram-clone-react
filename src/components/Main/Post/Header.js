import React from "react";

const Header = (props) => {
  const { postBy, postByPhoto, location } = props.postByInfo;

  return (
    <header>
      <div className="igpost-postby-photo" tabIndex="0">
        <canvas height="42" width="42"></canvas>
        <a href={"/" + postBy + "/"}>
          <img alt={postBy + " Profile Pic"} src={postByPhoto} />
        </a>
      </div>
      <div className="igpost-postby-label">
        <div className="igpost-postby-userid">
          <div className="igpost-postby-name-content">
            <a href={"/" + postBy + "/"}>{postBy}</a>
          </div>
        </div>
        <div className="igpost-postby-location">
          <div></div>
          <div>
            <a href="/explore/locations">{location}</a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
