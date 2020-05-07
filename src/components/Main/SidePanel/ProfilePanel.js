import React from "react";
import "./SidePanel.css";

const ProfilePanel = (props) => {
  const userId = props.profileInfo.userId;
  const userName = props.profileInfo.userName;
  const profilePhoto = props.profileInfo.profilePhoto;

  return (
    <div className="profile-container">
      <div className="profile">
        <div
          className="profile-photo"
          role="button"
          tabIndex="0"
          onClick={(e) => {
            props.setClickProfile(e, true);
          }}
        >
          <canvas height="60" width="60"></canvas>
          <a href={"/" + userId + "/"}>
            <img alt={userId + "'s Profile pic"} src={profilePhoto} />
          </a>
        </div>
        <div className="profile-label">
          <div
            className="profile-id"
            onClick={(e) => {
              props.setClickProfile(e, true);
            }}
          >
            <a href={"/" + userId + "/"}>{userId}</a>
          </div>
          <div className="profile-name">{userName}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
