import React from "react";


const ProfileMenu = (props) => {
  const userId = props.profileInfo.userId;
  const profilePhoto = props.profileInfo.profilePhoto;

  let style = {
    display: "none",
  };

  if (props.click) {
    style.display = "block";
  }

  return (
    <div className="nav-icon profile" onClick={props.handleClick}>
      <div className="nav-profile-container" style={style}></div>
      <a href={"/" + userId + "/"}>
        <img alt={userId + "'s Profile Pic"} src={profilePhoto} />
      </a>
    </div>
  );
};

export default ProfileMenu;
