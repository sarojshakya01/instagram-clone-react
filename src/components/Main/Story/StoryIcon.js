import React from "react";

class StoryIcon extends React.Component {
  componentDidMount = () => {
    const id = "story-canvas-" + this.props.index;
    var c = document.getElementById(id);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ff0000";
    ctx.arc(33, 33, 31, 0, 2 * Math.PI);
    ctx.stroke();
  };

  render() {
    const translateX = "translateX(" + 80 * parseInt(this.props.index) + "px)";
    const userId = this.props.story.userId;
    const profilePhoto = this.props.story.profilePhoto;
    return (
      <div className="story" style={{ transform: translateX }}>
        <button className="story-btn" role="menuitem" tabIndex="0">
          <div className="story-btn-inner" role="button" tabIndex="0">
            <canvas
              id={"story-canvas-" + this.props.index}
              height="66"
              width="66"
            ></canvas>
            <span className="canvas-span">
              <img alt={userId + "'s Profile Pic"} src={profilePhoto} />
            </span>
          </div>
          <div className="story-label">{userId}</div>
        </button>
      </div>
    );
  }
}

export default StoryIcon;
