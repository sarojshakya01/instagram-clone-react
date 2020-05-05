import React from "react";
import SuggestionRow from "./SuggestionRow";
import "./SidePanel.css";

class SuggestionPanel extends React.Component {
  renderSuggestions = () => {
    const suggestions = this.props.suggestions;

    const suggestionList = suggestions.map((suggestion, index) => {
      return (
        <SuggestionRow key={index} index={index} suggestion={suggestion} />
      );
    });
    return suggestionList;
  };

  render() {
    return (
      <div className="suggestion-container">
        <div className="suggestion-header">
          <div className="suggestion-header-label">
            <div className="suggestion-header-label-content">
              {"Suggestions For You"}
            </div>
          </div>
          <a className="suggestion-see-all" href="/explore/people/">
            <div className="suggestion-see-all-content">{"See All"}</div>
          </a>
        </div>
        <div className="suggestion-body-container">
          <div className="suggestion-body-outer">
            <div className="suggestion-body-inner">
              <div className="suggestion-body">{this.renderSuggestions()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestionPanel;
