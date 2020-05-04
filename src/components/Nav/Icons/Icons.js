import React from "react";
import HomeMenu from "./HomeMenu";
import DirectMenu from "./DirectMenu";
import ExploreMenu from "./ExploreMenu";
import ActivityMenu from "./ActivityMenu";
import ProfileMenu from "./ProfileMenu";
import "../Nav.css";

const Icons = (props) => {
  return (
    <div className="nav-icons-container">
      <div className="nav-icons-inner">
        <HomeMenu />
        <DirectMenu />
        <ExploreMenu />
        <ActivityMenu />
        <ProfileMenu profileInfo={props.profileInfo} />
      </div>
    </div>
  );
};

export default Icons;
