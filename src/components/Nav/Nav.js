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
          <div className="nav dark-need">
            <div className="nav-menus">
              <Brand darkTheme={this.props.label} />
              <Search />
              <Icons profileInfo={this.props.profileInfo} />
            </div>

            <SwitchTheme
              changeTheme={this.props.changeTheme}
              label={this.props.label}
            />
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
