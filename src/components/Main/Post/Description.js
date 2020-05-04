import React from "react";
import IconBar from "./IconBar/IconBar";
import LikeBar from "./LikeBar";
import CaptionComment from "./CaptionComment/CaptionComment";
import TimeDateBar from "./TimeDateBar";
import AddComment from "./AddComment";

import "./Post.css";

class Description extends React.Component {
  render() {
    const like = this.props.postDetail.like;
    const caption = this.props.postDetail.caption;
    const comments = this.props.postDetail.comments;
    const postTime = this.props.postDetail.postTime;
    return (
      <div className="igpost-description">
        <IconBar />
        <LikeBar like={like} />
        <CaptionComment caption={caption} comments={comments} />
        <TimeDateBar postTime={postTime} />
        <AddComment />
      </div>
    );
  }
}

export default Description;
