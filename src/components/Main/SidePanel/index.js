import React from "react";
import ProfilePanel from "./ProfilePanel";
import StoryPanel from "./StoryPanel";
import SuggestionPanel from "./SuggestionPanel";
import FooterPanel from "./FooterPanel";
import "./SidePanel.css";

class SidePanel extends React.Component {
  componentDidMount = () => {
    this.setState({
      darkTheme: this.props.darkTheme,
    });
  };

  render() {
    return (
      <div className="side-panel" style={this.props.style}>
        <ProfilePanel
          profileInfo={this.props.profileInfo}
          setClickProfile={this.props.setClickProfile}
        />
        <StoryPanel
          darkTheme={this.props.darkTheme}
          stories={this.props.stories}
        />
        <SuggestionPanel
          darkTheme={this.props.darkTheme}
          suggestions={this.props.suggestions}
        />
        <FooterPanel />
      </div>
    );
  }
}

export default SidePanel;
