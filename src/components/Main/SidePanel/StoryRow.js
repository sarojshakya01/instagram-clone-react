import React from "react";
import "./SidePanel.css";

class StoryRow extends React.Component {
  componentDidMount = () => {
    const id = "story-canvas-" + this.props.index;
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ff0000";
    ctx.arc(22, 22, 20, 0, 2 * Math.PI);
    ctx.stroke();
  };

  render() {
    // const translateX = "translateX(" + 80 * parseInt(this.props.index) + "px)";
    const userId = this.props.story.userId;
    const profilePhoto = this.props.story.profilePhoto;
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
              <time dateTime="2020-05-04T10:42:08.000Z" title={"Jan 1, 2020"}>
                {"9 hours ago"}
              </time>
            </div>
          </div>
        </button>
      </div>
    );
  }
}

export default StoryRow;
