import React from "react";
import "./Post.css";

class Photo extends React.Component {
  render() {
    const { postBy, photo } = this.props.photo;
    return (
      <div className="">
        <div
          className="igpost-image"
          role="button"
          tabIndex="0"
          onDoubleClick={this.props.setClickPost}
        >
          <div className="igpost-image-bg">
            <div className="igpost-image-bg-content">
              <img alt={"Post by " + postBy} src={photo} />
            </div>
            <div className="igpost-image-footer"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Photo;
