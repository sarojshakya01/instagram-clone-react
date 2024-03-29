import React, { useContext } from "react";
import ProfileContext from "../../../contexts/ProfileContext";

const ProfilePanel = (props) => {
  const { userId, userName, profilePhoto } = useContext(ProfileContext);

  return (
    <div className="profile-container">
      <div className="profile">
        <div
          className="profile-photo"
          role="button"
          tabIndex="0"
          onClick={(e) => {
            props.setClickProfile(e);
          }}
        >
          <canvas height="60" width="60"></canvas>
          <a href={"/" + userId}>
            <img alt={userId + "'s Profile pic"} src={profilePhoto} />
          </a>
        </div>
        <div className="profile-label">
          <div
            className="profile-id"
            onClick={(e) => {
              props.setClickProfile(e);
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
