import React from "react";
import "./Post.css";

class LikeBar extends React.Component {
  render() {
    const like = this.props.like;
    return (
      <section className="like-count">
        <div className="like-count-inner">
          <div className="like-count-content">
            <button type="button">
              <span>{like}</span>
              {" likes"}
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default LikeBar;
