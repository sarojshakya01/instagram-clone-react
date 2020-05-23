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
              clickNav={props.clickNav}
              inbox={props.inbox}
              handleClickNav={props.handleClickNav}
            />
          </div>
          <SwitchTheme changeTheme={props.changeTheme} label={props.label} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
