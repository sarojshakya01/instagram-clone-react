import React from "react";
import Brand from "./Brand";
import Search from "./Search/";
import Icons from "./Icons/";
import SwitchTheme from "./SwitchTheme";
import "./Nav.css";

const Nav = (props) => {
  return (
    <nav>
      <div className="inner-nav"></div>
      <div>
        <div className="nav dark-off">
          <div className="nav-menus">
            <Brand darkTheme={props.label} />
            <Search />
            <Icons
              profileInfo={props.profileInfo}
              clickProfile={props.clickProfile}
              inbox={props.inbox}
              setClickProfile={props.setClickProfile}
            />
          </div>
          <SwitchTheme changeTheme={props.changeTheme} label={props.label} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
