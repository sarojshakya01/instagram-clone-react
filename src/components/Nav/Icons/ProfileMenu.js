import React from "react";
import "../Nav.css";

const ProfileMenu = (props) => {
  const userId = props.profileInfo.userId;
  const profilePhoto = props.profileInfo.profilePhoto;
  return (
    <div className="nav-icon profile">
      <div></div>
      <a className="profileIconAchor" href={"/" + userId + "/"}>
        <img
          alt={userId + "'s Profile Pic"}
          className="profileIcon"
          src={profilePhoto}
        />
      </a>
    </div>
  );
};

export default ProfileMenu;
