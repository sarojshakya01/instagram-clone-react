import React from "react";
import axios from "axios";
import Nav from "./components/Nav/";
import Main from "./components/Main/";
import Profile from "./components/Profile/";
import Footer from "./components/Footer/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const loginUser = "sarojsh01"; // temp data
const loginPassword = "12345"; // temp data

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      darkTheme: false,
      inbox: 0,
      clickNav: "home",
    };
    this.loginUser = {
      userId: "",
      userName: "",
      profilePhoto: "",
    };
  }

  componentDidMount = () => {
    const self = this;
    const imgUrl = "../../img/userdata/";
    const params = {
      userId: loginUser,
      password: loginPassword,
    };

    axios
      .post(
        "http://https://instagram2-saroj.herokuapp.com//user",
        {
          params,
        },
        { timeout: 5000 }
      )
      .then((response) => {
        self.loginUser.userId = response.data[0].userid;
        self.loginUser.userName = response.data[0].username;
        self.loginUser.profilePhoto = imgUrl + response.data[0].profilephoto;

        self.setState(() => ({
          inbox: 5,
        }));
      })
      .catch(() => {
        // handle the user not found case
      });

    if (
      sessionStorage.getItem("darkTheme") !== undefined &&
      sessionStorage.getItem("darkTheme") !== "undefined"
    ) {
      this.setState({
        darkTheme: "true" === sessionStorage.getItem("darkTheme"),
      });
    }
  };

  componentDidUpdate = () => {
    if (this.state.darkTheme) {
      const elems = document.getElementsByClassName("dark-off");

      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.add("dark");
      }
    } else {
      const elems = document.getElementsByClassName("dark-off");

      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove("dark");
      }
    }
  };

  updateTheme = () => {
    this.changeTheme();
    this.changeTheme();
  };

  changeTheme = () => {
    this.setState({ darkTheme: !this.state.darkTheme });
    sessionStorage.setItem("darkTheme", !this.state.darkTheme);
  };

  setClickProfile = (e) => {
    e.preventDefault();
    this.setState({ clickNav: "profile" });
  };

  handleClickNav = (e) => {
    if (e.currentTarget.className.indexOf("home") > -1) {
      this.setState({ clickNav: "home" });
    } else if (e.currentTarget.className.indexOf("direct") > -1) {
      this.setState({ clickNav: "direct" });
      this.setState({ inbox: 0 });
    } else if (e.currentTarget.className.indexOf("explore") > -1) {
      this.setState({ clickNav: "explore" });
    } else if (e.currentTarget.className.indexOf("activity") > -1) {
      this.setState({ clickNav: "activity" });
    } else if (e.currentTarget.className.indexOf("profile") > -1) {
      this.setState({ clickNav: "profile" });
    } else {
      this.setState({ clickNav: "" });
    }
    e.preventDefault();
  };

  render() {
    const darkLabel = this.state.darkTheme ? "ON" : "OFF";

    return (
      <Router>
        <div className="root-inner">
          {/* {this.state.clickNav === "profile" ? (
            <Profile darkTheme={this.state.darkTheme} />
          ) : (
            <Main
              darkTheme={this.state.darkTheme}
              profileInfo={this.loginUser}
              updateTheme={this.updateTheme}
              setClickProfile={this.setClickProfile}
            />
          )} */}
          <Switch>
            {window.location.pathname === "/" ? (
              <Route path="/">
                <Main
                  darkTheme={this.state.darkTheme}
                  profileInfo={this.loginUser}
                  updateTheme={this.updateTheme}
                  setClickProfile={this.setClickProfile}
                />
                {window.innerWidth <= 1056 ? <Footer /> : null}
              </Route>
            ) : (
              <Route path={window.location.pathname}>
                <Profile darkTheme={this.state.darkTheme} />
                <Footer />
              </Route>
            )}
          </Switch>
          <Nav
            label={darkLabel}
            profileInfo={this.loginUser}
            clickNav={this.state.clickNav}
            inbox={this.state.inbox}
            changeTheme={this.changeTheme}
            handleClickNav={this.handleClickNav}
          />
        </div>
      </Router>
    );
  }
}

export default App;
