import React from "react";
import axios from "axios";
import Nav from "./components/Nav/";
import Main from "./components/Main/";
import Footer from "./components/Footer/";
import "./index.css";

const loginUser = "sarojsh01";
const loginPassword = "12345";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      darkTheme: false,
      loginUser: {
        userId: "",
        profilePhoto: "",
      },
      inbox: 0,
      clickProfile: false,
    };
  }

  componentDidMount = () => {
    const that = this;
    const imgUrl = "../../img/userdata/";
    const params = {
      userid: loginUser,
      password: loginPassword,
    };

    axios
      .post("http://localhost:3001/user", null, {
        params: params,
      })
      .then(function (response) {
        let loginUser = {
          userId: response.data[0].userid,
          userName: response.data[0].username,
          profilePhoto: imgUrl + response.data[0].profilephoto,
        };
        that.setState(() => ({
          loginUser: loginUser,
          inbox: 80,
        }));
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
          profileInfo={this.state.loginUser}
          updateTheme={this.updateTheme}
          setClickProfile={this.setClickProfile}
        />
        <Nav
          label={darkLabel}
          profileInfo={this.state.loginUser}
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
