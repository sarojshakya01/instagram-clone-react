import React from "react";
import axios from "axios";
import Nav from "./components/Nav/";
import Main from "./components/Main/";
import Profile from "./components/Profile/";
import Footer from "./components/Footer/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { API_URL } from "./config";
import ThemeContext from "./contexts/ThemeContext";
import ProfileContext from "./contexts/ProfileContext";

const loginUser = "sarojsh01"; // temp data
const loginPassword = "12345"; // temp data

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: sessionStorage.getItem("theme") || "light",
      inbox: 0,
      activeNav: "home",
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
        API_URL + "user/current",
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
  };

  componentDidUpdate = () => {
    if (this.state.theme === "dark") {
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

  changeTheme = () => {
    this.setState({ theme: this.state.theme === "dark" ? "light" : "dark" });
    sessionStorage.setItem(
      "theme",
      this.state.theme === "dark" ? "light" : "dark"
    );
  };

  handleClickNav = (e) => {
    if (e.currentTarget.className.indexOf("home") > -1) {
      this.setState({ activeNav: "home" });
    } else if (e.currentTarget.className.indexOf("direct") > -1) {
      this.setState({ activeNav: "direct" });
      this.setState({ inbox: 0 });
    } else if (e.currentTarget.className.indexOf("explore") > -1) {
      this.setState({ activeNav: "explore" });
    } else if (e.currentTarget.className.indexOf("activity") > -1) {
      this.setState({ activeNav: "activity" });
    } else if (e.currentTarget.className.indexOf("profile") > -1) {
      this.setState({ activeNav: "profile" });
    } else {
      this.setState({ activeNav: "" });
    }
    if (e.currentTarget.className.indexOf("profile") === -1) {
      e.preventDefault();
    }
  };

  render() {
    return (
      <Router>
        <div className="root-inner">
          <ThemeContext.Provider value={{ theme: this.state.theme }}>
            <ProfileContext.Provider value={{ ...this.loginUser }}>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/:userId" component={Profile} />
              </Switch>
              {window.innerWidth <= 1056 ? <Footer /> : null}
              <Nav
                activeNav={this.state.activeNav}
                inbox={this.state.inbox}
                changeTheme={this.changeTheme}
                handleClickNav={this.handleClickNav}
              />
            </ProfileContext.Provider>
          </ThemeContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
