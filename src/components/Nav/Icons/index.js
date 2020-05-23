import React from "react";
import HomeMenu from "./HomeMenu";
import DirectMenu from "./DirectMenu";
import ExploreMenu from "./ExploreMenu";
import ActivityMenu from "./ActivityMenu";
import ProfileMenu from "./ProfileMenu";
import "./Icons.css";

const Icons = (props) => {
  const clickHome = props.clickNav === "home";
  const clickDirect = props.clickNav === "direct";
  const clickExplore = props.clickNav === "explore";
  const clickActivity = props.clickNav === "activity";
  const clickProfile = props.clickNav === "profile";

  return (
    <div className="nav-icons-container">
      <div className="nav-icons-inner">
        <HomeMenu click={clickHome} handleClick={props.handleClickNav} />
        <DirectMenu
          click={clickDirect}
          handleClick={props.handleClickNav}
          inbox={props.inbox}
        />
        <ExploreMenu click={clickExplore} handleClick={props.handleClickNav} />
        <ActivityMenu
          click={clickActivity}
          handleClick={props.handleClickNav}
        />
        <ProfileMenu
          click={clickProfile}
          handleClick={props.handleClickNav}
          profileInfo={props.profileInfo}
        />
      </div>
    </div>
  );
};

export default Icons;
