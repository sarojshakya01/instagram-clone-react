import React from "react";
import Comment from "./Comment";
import "../Post.css";

class commentList extends React.Component {
  renderComments = () => {
    const commentList = this.props.comments;
    let comments = [];
    for (let i = 0; i < commentList.length; i++) {
      let myComment = <Comment key={i} comment={commentList[i]} />;
      comments.push(myComment);
      if (i >= 2) break;
    }
    return comments;
  };

  render() {
    return (
      <div className="">
        <div className="viewall">
          <a href="/">
            {"View all"} <span>{this.props.comments.length}</span>
            {" comments"}
          </a>
        </div>
        {this.renderComments()}
      </div>
    );
  }
}

export default commentList;
