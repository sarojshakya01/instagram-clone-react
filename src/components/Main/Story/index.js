import React from "react";
import axios from "axios";
import StoryIcon from "./StoryIcon";
import "./Story.css";

class Story extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchedStory: false,
      stories: [],
    };
  }

  componentDidMount = () => {
    const that = this;
    const imgUrl = "../../img/userdata/";
    const loginUser = "sarojsh01";
    let tempStories = [];

    axios
      .get("http://localhost:3001/story?userid=" + loginUser)
      .then(function (response) {
        tempStories = response.data.map((myStory) => {
          let story = {
            userId: "",
            profilePhoto: "",
            storyDate: "",
          };
          story.userId = myStory.userid;
          story.profilePhoto = imgUrl + myStory.profilephoto;
          story.storyDate = myStory.storydate;
          return story;
        });
        that.setState(() => ({
          stories: tempStories,
          fetchedStory: true,
        }));
      });
  };

  componentDidUpdate = () => {
    if (this.props.darkTheme) {
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
    const stories = this.state.stories;
    const storyList = stories.map((story, index) => {
      return <StoryIcon key={index} index={index} story={story} />;
    });
    return storyList;
  };

  render() {
    return (
      <div id="story-top" className="story-top story-container dark-off">
        <div className="stories">
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
            <div className="story-inner">
              <div className="story-inner-inner">{this.renderStories()}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Story;
