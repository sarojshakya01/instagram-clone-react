import React from "react";
import "./SidePanel.css";

class SuggestionRow extends React.Component {
  constructor() {
    super();
    this.state = {
      clickFollow: false,
    };
  }

  handleClickFollow = () => {
    this.setState({ clickFollow: !this.state.clickFollow });
    alert("This functionality is in development process");
  };
  render() {
    const userId = this.props.suggestion.userId;
    const profilePhoto = this.props.suggestion.profilePhoto;
    const commonFollowedBy = this.props.suggestion.commonFollowedBy;

    let followedBy = "";

    if (commonFollowedBy.length > 0) {
      followedBy =
        commonFollowedBy[0] +
        " + " +
        (commonFollowedBy.length - 1).toString() +
        "more";
    }

    const followLabel = this.props.suggestion.isFollowdBy
      ? "Follows you"
      : "followed by " + followedBy;

    return (
      <div className="suggestion-row">
        <div className="suggestion-profile-photo-container">
          <div className="suggestion-profile-photo" role="button" tabIndex="0">
            <canvas
              id={"suggestion-canvas-" + this.props.index}
              height="42"
              width="42"
            ></canvas>
            <span role="link" tabIndex="0">
              <img alt={userId + "'s Profile pic"} src={profilePhoto} />
            </span>
          </div>
        </div>
        <div className="suggestion-user-label">
          <div className="suggestion-user-id">
            <div className="suggestion-user-id-inner">
              <a title={userId} href={"/" + userId + "/"}>
                <div className="suggestion-user-id-inner-container">
                  <div className="suggestion-user-id-content-outer">
                    <div className="suggestion-user-id-content">{userId}</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="suggestion-follow">
            <div className="suggestion-follow-content">{followLabel}</div>
          </div>
        </div>
        <div className="follow-link">
          <button onClick={this.handleClickFollow}>{"Follow"}</button>
        </div>
      </div>
    );
  }
}

export default SuggestionRow;
