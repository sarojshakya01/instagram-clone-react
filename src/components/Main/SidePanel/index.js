import React from "react";
import ProfilePanel from "./ProfilePanel";
import StoryPanel from "./StoryPanel";
import SuggestionPanel from "./SuggestionPanel";
import FooterPanel from "./FooterPanel";
import "./SidePanel.css";

const SidePanel = (props) => {
  return (
    <div className="side-panel" style={props.style}>
      <ProfilePanel />
      <StoryPanel stories={props.stories} />
      <SuggestionPanel suggestions={props.suggestions} />
      <FooterPanel />
    </div>
  );
};

export default SidePanel;
