import React from "react";

const ResultRow = (props) => {
  const userId = props.result.userId;
  const profilePhoto = props.result.profilePhoto;
  const userName = props.result.userName;

  return (
    <a href={"/" + userId + "/"}>
      <div className="search-result-row">
        <div className="search-result-photo">
          <canvas height="42" width="42"></canvas>
          <span>
            <img alt={userId + "'s profile pic"} src={profilePhoto} />
          </span>
        </div>
        <div className="search-result-label">
          <div className="search-result-userid">
            <span>{userId}</span>
          </div>
          <span className="search-result-username">{userName}</span>
        </div>
      </div>
    </a>
  );
};

export default ResultRow;
