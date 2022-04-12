import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfileContext from "../../../contexts/ProfileContext";

const ProfileMenu = (props) => {
  const { userId, profilePhoto } = useContext(ProfileContext);

  let style = {
    display: "none",
  };

  if (props.click) {
    style.display = "block";
  }

  return (
    <div className="nav-icon profile" onClick={props.handleClick}>
      <div className="nav-profile-container" style={style}></div>

      <Link to={"/" + userId}>
        <img alt={userId + "'s Profile Pic"} src={profilePhoto} />
      </Link>
    </div>
  );
};

export default ProfileMenu;
