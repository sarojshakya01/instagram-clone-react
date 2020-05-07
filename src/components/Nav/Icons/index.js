import React, { useState } from "react";
import HomeMenu from "./HomeMenu";
import DirectMenu from "./DirectMenu";
import ExploreMenu from "./ExploreMenu";
import ActivityMenu from "./ActivityMenu";
import ProfileMenu from "./ProfileMenu";
import "../Nav.css";

const Icons = (props) => {
  const [clickHome, setClickHome] = useState(true);
  const [clickDirect, setClickDirect] = useState(false);
  const [clickExplore, setClickExplore] = useState(false);
  const [clickActivity, setClickActivity] = useState(false);
  const [clickProfile, setClickProfile] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (e.currentTarget.className.indexOf("home") > -1) {
      setClickHome(true);
      setClickDirect(false);
      setClickExplore(false);
      setClickActivity(false);
      setClickProfile(false);
      props.setClickProfile(e, false);
    } else if (e.currentTarget.className.indexOf("direct") > -1) {
      setClickHome(false);
      setClickDirect(true);
      setClickExplore(false);
      setClickActivity(false);
      setClickProfile(false);
      props.setClickProfile(e, false);
    } else if (e.currentTarget.className.indexOf("explore") > -1) {
      setClickHome(false);
      setClickDirect(false);
      setClickExplore(true);
      setClickActivity(false);
      setClickProfile(false);
      props.setClickProfile(e, false);
    } else if (e.currentTarget.className.indexOf("activity") > -1) {
      setClickHome(false);
      setClickDirect(false);
      setClickExplore(false);
      setClickActivity(true);
      setClickProfile(false);
      props.setClickProfile(e, false);
    } else if (e.currentTarget.className.indexOf("profile") > -1) {
      setClickHome(false);
      setClickDirect(false);
      setClickExplore(false);
      setClickActivity(false);
      setClickProfile(true);
      props.setClickProfile(e, true);
    } else {
      setClickHome(false);
      setClickDirect(false);
      setClickExplore(false);
      setClickActivity(false);
      setClickProfile(false);
      props.setClickProfile(e, false);
    }
  };

  return (
    <div className="nav-icons-container">
      <div className="nav-icons-inner">
        <HomeMenu click={clickHome} handleClick={handleClick} />
        <DirectMenu
          click={clickDirect}
          handleClick={handleClick}
          inbox={props.inbox}
        />
        <ExploreMenu click={clickExplore} handleClick={handleClick} />
        <ActivityMenu click={clickActivity} handleClick={handleClick} />
        <ProfileMenu
          click={props.clickProfile || clickProfile}
          profileInfo={props.profileInfo}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Icons;
