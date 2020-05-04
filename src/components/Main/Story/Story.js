import React from "react";
import StoryIcon from "./StoryIcon";
import "./Story.css";

class Story extends React.Component {
  renderStories = () => {
    const stories = this.props.stories;
    const storyList = stories.map((story, index) => {
      return <StoryIcon key={index} index={index} story={story} />;
    });
    return storyList;
  };

  render() {
    return (
      <div className="story-container dark-need">
        <div className="stories">
          {!this.props.fetched ? (
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
