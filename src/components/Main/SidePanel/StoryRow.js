import React from "react";

class StoryRow extends React.Component {
  componentDidMount = () => {
    const id = "story-canvas-" + this.props.index;
    let c = document.getElementById(id);
    if (c !== null) {
      let ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ff0000";
      ctx.arc(22, 22, 20, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  render() {
    const { userId, profilePhoto, storyDate } = this.props.story;
    const dateInt = Date.parse(storyDate);

    let now = new Date();
    now = Date.parse(now);
    const diffSec = (now - dateInt) / 1000;

    // if (diffSec / 3600 > 24) return null;

    let label = "";
    let roundedDiff = 0;

    if (diffSec < 60) {
      roundedDiff = Math.round(diffSec);
      label =
        roundedDiff.toString() +
        (roundedDiff > 1 ? " seconds" : " second") +
        " ago";
    } else if (diffSec / 60 < 60) {
      roundedDiff = Math.round(diffSec / 60);
      label =
        roundedDiff.toString() +
        (roundedDiff > 1 ? " minutes" : " minute") +
        " ago";
    } else if (diffSec / 3600 < 24) {
      roundedDiff = Math.round(diffSec / 3600);
      label =
        roundedDiff.toString() + (roundedDiff > 1 ? " hours" : "hour") + " ago";
    } else if (diffSec / 86400 < 30) {
      roundedDiff = Math.round(diffSec / 86400);
      label =
        roundedDiff.toString() + (roundedDiff > 1 ? " days" : " day") + " ago";
    } else if (diffSec / (86400 * 30) < 12) {
      roundedDiff = Math.round(diffSec / (86400 * 30));
      label =
        roundedDiff.toString() +
        (roundedDiff > 1 ? " months" : " month") +
        " ago";
    } else if (diffSec / 86400 < 365) {
      roundedDiff = Math.round(diffSec / 86400);
      label =
        roundedDiff.toString() +
        (roundedDiff > 1 ? " years" : " yeaar") +
        " ago";
    }

    return (
      <div className="story-row">
        <button>
          <div className="story-profile-photo" role="button" tabIndex="0">
            <canvas
              id={"story-canvas-" + this.props.index}
              height="44"
              width="44"
            ></canvas>
            <span role="link" tabIndex="0">
              <img alt={userId + "'s Profile pic"} src={profilePhoto} />
            </span>
          </div>
          <div className="story-user-label">
            <div className="story-user-id">
              <span>{userId}</span>
            </div>
            <div className="story-time">
              <time dateTime={storyDate} title={storyDate}>
                {label}
              </time>
            </div>
          </div>
        </button>
      </div>
    );
  }
}

export default StoryRow;
