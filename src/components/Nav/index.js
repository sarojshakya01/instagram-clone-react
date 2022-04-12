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
            <Brand />
            <Search />
            <Icons
              activeNav={props.activeNav}
              inbox={props.inbox}
              handleClickNav={props.handleClickNav}
            />
          </div>
          <SwitchTheme changeTheme={props.changeTheme} />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
