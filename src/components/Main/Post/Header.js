import React from "react";
import "./Post.css";

const Header = (props) => {
  const { postBy, postByPhoto } = props.postByInfo;
  return (
    <header>
      <div className="igpost-user" tabIndex="0">
        <canvas height="42" width="42"></canvas>
        <a href={"/" + postBy + "/"}>
          <img alt={postBy + " Profile Pic"} src={postByPhoto} />
        </a>
      </div>
      <div className="igpost-user-name">
        <div className="igpost-user-name-inner">
          <div className="igpost-user-name-content">
            <a href={"/" + postBy + "/"}>{postBy}</a>
          </div>
        </div>
        <div className="igpost-user-name-footer">
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
  );
};
export default Header;
