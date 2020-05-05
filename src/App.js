import React from "react";
import axios from "axios";
import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./index.css";

const loginUser = "sarojsh01";
const loginPassword = "12345";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isDarkTheme: false,
      loginUser: {
        userId: "",
        profilePhoto: "",
      },
    };
  }

  componentDidMount = () => {
    const that = this;
    const imgUrl = "../../img/userdata/";

    axios
      .get(
        "http://localhost:3001/user?userid=" +
          loginUser +
          "&password=" +
          loginPassword
      )
      .then(function (response) {
        let loginUser = {
          userId: response.data[0].userid,
          profilePhoto: imgUrl + response.data[0].profilephoto,
        };
        that.setState(() => ({
          loginUser: loginUser,
        }));
      });
  };

  changeTheme = () => {
    this.setState({ darkTheme: !this.state.darkTheme });
  };

  render() {
    const darkLabel = this.state.darkTheme ? "ON" : "OFF";

    if (this.state.darkTheme) {
      const elems = document.getElementsByClassName("dark-need");

      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.add("dark");
      }
    } else {
      const elems = document.getElementsByClassName("dark-need");

      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove("dark");
      }
    }

    return (
      <div className="root-inner">
        <div></div>
        <Main profileInfo={this.state.loginUser} />
        <Nav
          profileInfo={this.state.loginUser}
          changeTheme={this.changeTheme}
          label={darkLabel}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
