import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const ProfileMenu = (props) => {
  const { userId, profilePhoto } = props.profileInfo;

  let style = {
    display: "none",
  };

  if (props.click) {
    style.display = "block";
  }

  return (
    <>
      <div className="nav-icon profile" onClick={props.handleClick}>
        <div className="nav-profile-container" style={style}></div>

        <Link to={"/" + userId + "/"}>
          <img alt={userId + "'s Profile Pic"} src={profilePhoto} />
        </Link>
        <Router></Router>
      </div>
    </>
  );
};

export default ProfileMenu;
