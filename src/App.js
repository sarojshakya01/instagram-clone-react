import React from "react";
import axios from "axios";
import Nav from "./components/Nav/";
import Main from "./components/Main/";
import Footer from "./components/Footer/";

const loginUser = "sarojsh01"; // temp data
const loginPassword = "12345"; // temp data

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      darkTheme: false,
      inbox: 0,
      clickProfile: false,
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
        "http://localhost:3001/user",
        {
          params,
        },
        { timeout: 5000 }
      )
      .then(function (response) {
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

  setClickProfile = (e, value) => {
    e.preventDefault();
    this.setState({ clickProfile: value });
  };

  render() {
    const darkLabel = this.state.darkTheme ? "ON" : "OFF";

    return (
      <div className="root-inner">
        <div></div>
        <Main
          darkTheme={this.state.darkTheme}
          profileInfo={this.loginUser}
          updateTheme={this.updateTheme}
          setClickProfile={this.setClickProfile}
        />
        <Nav
          label={darkLabel}
          profileInfo={this.loginUser}
          clickProfile={this.state.clickProfile}
          inbox={this.state.inbox}
          changeTheme={this.changeTheme}
          setClickProfile={this.setClickProfile}
        />
        {window.innerWidth <= 1056 ? <Footer /> : null}
      </div>
    );
  }
}

export default App;
