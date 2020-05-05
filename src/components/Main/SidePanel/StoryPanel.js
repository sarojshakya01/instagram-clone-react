import React from "react";
import StoryRow from "./StoryRow";
import "./SidePanel.css";

class StoryPanel extends React.Component {
  renderStories = () => {
    const stories = this.props.stories;
    const storyList = stories.map((story, index) => {
      return <StoryRow key={index} index={index} story={story} />;
    });
    return storyList;
  };

  render() {
    return (
      <div className="story-container dark-need">
        <div className="story-header">
          <div className="story-header-label">
            <div className="story-header-label-content">{"Stories"}</div>
          </div>
          <a className="story-watch-all" href="/#">
            <div className="story-watch-all-content">{"Watch All"}</div>
          </a>
        </div>
        <div className="story-body-container">
          <div className="story-body-outer">
            <div className="story-body-inner">
              <div className="story-body">{this.renderStories()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StoryPanel;
