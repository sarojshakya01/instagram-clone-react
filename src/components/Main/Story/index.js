import React from "react";
import axios from "axios";
import StoryIcon from "./StoryIcon";
import "./Story.css";
import { API_URL } from "../../../config";

class Story extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchedStory: false,
      stories: [],
      storyIndex: 0,
    };
  }

  componentDidMount = () => {
    const self = this;
    const imgUrl = "../../img/userdata/";
    const loginUser = "sarojsh01";

    axios
      .get(API_URL + "story/all?userId=" + loginUser, { timeout: 5000 })
      .then((response) => {
        let tempStories = response.data.map((myStory) => {
          let story = {
            userId: myStory.userid,
            profilePhoto: imgUrl + myStory.profilephoto,
            storyDate: myStory.storydate,
          };
          return story;
        });

        self.setState(() => ({
          stories: tempStories,
          fetchedStory: true,
        }));
      })
      .catch((err) => {
        axios
          .get("/story/all.json?userId=" + loginUser, { timeout: 5000 })
          .then((response) => {
            let tempStories = response.data.map((myStory) => {
              let story = {
                userId: myStory.userid,
                profilePhoto: imgUrl + myStory.profilephoto,
                storyDate: myStory.storydate,
              };
              return story;
            });

            self.setState(() => ({
              stories: tempStories,
              fetchedStory: true,
            }));
          })
          .catch((err) => {
            // handle error
            self.setState(() => ({
              fetchedStory: true,
            }));
          });
      });
  };

  componentDidUpdate = () => {
    if (this.context.theme === "dark") {
      const container = document.getElementById("story-top");
      const elems = container.parentElement.getElementsByClassName("dark-off");

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

  renderStories = () => {
    const { stories } = this.state;

    let storyList = [];
    const uptoIndex = this.state.stories.length > this.state.storyIndex + 8 ? this.state.storyIndex + 8 : this.state.stories.length;

    for (let i = this.state.storyIndex; i < uptoIndex; i++) {
      const storyIcon = <StoryIcon key={i} index={i - this.state.storyIndex} story={stories[i]} />;
      storyList.push(storyIcon);
    }
    return storyList;
  };

  handleNextStory = () => {
    if (this.state.stories.length > this.state.storyIndex + 7) {
      this.setState({
        storyIndex: this.state.storyIndex + 4,
      });
    }
  };

  handlePrevStory = () => {
    if (this.state.storyIndex > 3) {
      this.setState({
        storyIndex: this.state.storyIndex - 4,
      });
    }
  };

  render() {
    return (
      <div id="story-top" className="story-top story-container dark-off">
        <div className="stories">
          {!this.state.fetchedStory ? (
            <div className="story-loader">
              <img alt="Loading..." src="../../img/loader.gif" height="32" width="32" />
            </div>
          ) : (
            <div className="story-inner">
              <div className="story-inner-inner">{this.renderStories()}</div>
            </div>
          )}
          {this.state.storyIndex > 3 ? (
            <div className={`slide-arrow slide-arrow-left`} onClick={this.handlePrevStory}>
              <div className={`slide-arrow-icon slide-arrow-icon-left`}></div>
            </div>
          ) : null}
          {this.state.stories.length > this.state.storyIndex + 7 ? (
            <div className={`slide-arrow slide-arrow-right`} onClick={this.handleNextStory}>
              <div className={`slide-arrow-icon slide-arrow-icon-right`}></div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Story;
