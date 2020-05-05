import React from "react";
import Brand from "./Brand";
import Search from "./Search";
import Icons from "./Icons/Icons";
import SwitchTheme from "./SwitchTheme";
import "./Nav.css";

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="inner-nav"></div>
        <div>
          <div className="nav">
            <div className="nav-menus">
              <Brand />
              <Search />
              <Icons profileInfo={this.props.profileInfo} />
              {/* <SwitchTheme
                changeTheme={this.props.changeTheme}
                label={this.props.label}
              /> */}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
