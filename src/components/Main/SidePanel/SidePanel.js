import React from "react";
import ProfilePanel from "./ProfilePanel";
import StoryPanel from "./StoryPanel";
import SuggestionPanel from "./SuggestionPanel";
import FooterPanel from "./FooterPanel";
import "./SidePanel.css";

class SidePanel extends React.Component {
  render() {
    return (
      <div className="side-panel" style={this.props.style}>
        <ProfilePanel profileInfo={this.props.profileInfo} />
        <StoryPanel stories={this.props.stories} />
        <SuggestionPanel suggestions={this.props.stories} />
        <FooterPanel />
      </div>
    );
  }
}

export default SidePanel;
