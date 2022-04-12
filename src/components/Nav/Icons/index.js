import React from "react";
import HomeMenu from "./HomeMenu";
import DirectMenu from "./DirectMenu";
import ExploreMenu from "./ExploreMenu";
import ActivityMenu from "./ActivityMenu";
import ProfileMenu from "./ProfileMenu";
import "./Icons.css";

const Icons = (props) => {
  const homeActive = props.activeNav === "home";
  const directActive = props.activeNav === "direct";
  const exploreActive = props.activeNav === "explore";
  const activityActive = props.activeNav === "activity";
  const profileActive = props.activeNav === "profile";

  return (
    <div className="nav-icons-container">
      <div className="nav-icons-inner">
        <HomeMenu click={homeActive} handleClick={props.handleClickNav} />
        <DirectMenu
          click={directActive}
          handleClick={props.handleClickNav}
          inbox={props.inbox}
        />
        <ExploreMenu click={exploreActive} handleClick={props.handleClickNav} />
        <ActivityMenu
          click={activityActive}
          handleClick={props.handleClickNav}
        />
        <ProfileMenu
          click={profileActive}
          handleClick={props.handleClickNav}
          profileInfo={props.profileInfo}
        />
      </div>
    </div>
  );
};

export default Icons;
