import React from "react";
import "../Post.css";
import Caption from "./Caption";
import CommentList from "./CommentList";

class CaptionComment extends React.Component {
  render() {
    const caption = this.props.caption;
    const comments = this.props.comments;
    return (
      <div className="caption-comment">
        <Caption caption={caption} />
        <CommentList comments={comments} />
      </div>
    );
  }
}

export default CaptionComment;
