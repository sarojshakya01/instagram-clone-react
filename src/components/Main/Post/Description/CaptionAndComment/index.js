import React from "react";
import "./CaptionAndComment.css";
import Caption from "./Caption";
import CommentList from "./CommentList";

const CaptionComment = (props) => {
  const caption = props.caption;
  const comments = props.comments;

  return (
    <div className="caption-comment">
      {caption.caption.length > 0 ? <Caption caption={caption} /> : null}
      <CommentList comments={comments} loginUser={props.loginUser} />
    </div>
  );
};

export default CaptionComment;
