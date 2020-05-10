import React from "react";
import "./CaptionAndComment.css";
import Caption from "./Caption";
import CommentList from "./CommentList";

const CaptionComment = (props) => {
  const { caption, comments } = props;

  return (
    <div className="caption-comment">
      {caption.caption.length > 0 ? <Caption caption={caption} /> : null}
      <CommentList
        postBy={props.postBy}
        comments={comments}
        loginUser={props.loginUser}
        handleClickLikeComment={props.handleClickLikeComment}
        handleClickDeleteComment={props.handleClickDeleteComment}
      />
    </div>
  );
};

export default CaptionComment;
