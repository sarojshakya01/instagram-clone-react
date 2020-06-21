import React from "react";
import axios from "axios";
import StoryRow from "./StoryRow";

class StoryPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchedStory: false,
      stories: [],
      watchAll: false,
    };
  }

  componentDidMount = () => {
    const self = this;
    const imgUrl = "../../img/userdata/";
    const loginUser = "sarojsh01";
    let tempStories = [];

    axios
      .get("http://localhost:3001/story?userId=" + loginUser, { timeout: 5000 })
      .then((response) => {
        tempStories = response.data.map((myStory) => {
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
        //handle error
        self.setState(() => ({
          fetchedStory: true,
        }));
      });
  };

  componentDidUpdate = () => {
    if (this.props.darkTheme) {
      const container = document.getElementById("side-panel-story");
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

    if (this.state.watchAll) {
      const { stories } = this.state;
      const storyList = stories.map((story, index) => {
        return <StoryRow key={index} index={index} story={story} />;
      });
      return storyList;
    } else {
      let storyList = [];
      const uptoIndex =
        this.state.stories.length > 8 ? 8 : this.state.stories.length;

      for (let i = 0; i < uptoIndex; i++) {
        const storyIcon = <StoryRow key={i} index={i} story={stories[i]} />;
        storyList.push(storyIcon);
      }
      return storyList;
    }
  };

  handleWatchAll = () => {
    this.setState({ watchAll: !this.state.watchAll });
  };

  render() {
    return (
      <div id="side-panel-story" className="story-container dark-off">
        <div className="story-header">
          <div className="story-header-label">
            <div className="story-header-label-content">{"Stories"}</div>
          </div>
          <a className="story-watch-all" href="/#">
            <div
              className="story-watch-all-content"
              onClick={this.handleWatchAll}
            >
              {this.state.watchAll ? "Watch Unseen" : "Watch All"}
            </div>
          </a>
        </div>
        <div className="story-body-container">
          <div className="story-body-outer">
            <div className="story-body-inner">
              {!this.state.fetchedStory ? (
                <div className="story-loader">
                  <img
                    alt="Loading..."
                    src="../../img/loader.gif"
                    height="32"
                    width="32"
                  />
                </div>
              ) : (
                <div className="story-body">{this.renderStories()}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StoryPanel;
