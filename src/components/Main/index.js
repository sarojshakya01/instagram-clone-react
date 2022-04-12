import React from "react";
import Story from "./Story";
import SidePanel from "./SidePanel";
import Post from "./Post";
import "./Main.css";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      style: {
        left: "0px",
      },
    };
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.handleResize);
    const element = document.getElementById("igpost-main");
    const leftPos = element.getBoundingClientRect().left + window.scrollX;

    const myStyle = {
      left: (leftPos + 642).toString() + "px",
    };

    this.setState(() => ({
      style: myStyle,
    }));
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleResize);
  };

  handleResize = () => {
    const element = document.getElementById("igpost-main");
    const leftPos = element.getBoundingClientRect().left + window.scrollX;

    const myStyle = {
      left: (leftPos + 642).toString() + "px",
    };

    this.setState(() => ({
      style: myStyle,
    }));
  };

  render() {
    return (
      <main role="main" className="dark-off">
        {window.innerWidth <= 1056 ? (
          <section className="main-section">
            <Story />
            <Post />
          </section>
        ) : (
          <section className="main-section-2">
            <Post />
            <div className="post-story-gap"></div>
            <SidePanel style={this.state.style} />
          </section>
        )}

        <div>
          <form encType="multipart/form-data" method="POST" role="presentation">
            <input
              className="fileInput"
              accept="image/jpeg,image/png"
              type="file"
            />
          </form>
        </div>
      </main>
    );
  }
}

export default Main;
