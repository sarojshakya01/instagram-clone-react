import React from "react";
import Comment from "./Comment";

class commentList extends React.Component {
  constructor() {
    super();
    this.state = {
      click: false,
    };
  }

  renderComments = () => {
    const commentList = this.props.comments.reverse();
    let comments = [];
    for (let i = 0; i < commentList.length; i++) {
      let myComment = (
        <Comment
          key={i}
          postBy={this.props.postBy}
          comment={commentList[i]}
          loginUser={this.props.loginUser}
          handleClickLikeComment={this.props.handleClickLikeComment}
          handleClickDeleteComment={this.props.handleClickDeleteComment}
        />
      );
      comments.push(myComment);
      if (!this.state.click && i >= 2) break;
    }
    return comments;
  };

  render() {
    return (
      <div className="">
        {this.props.comments.length > 3 ? (
          <div
            className="viewall"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ click: !this.state.click });
            }}
          >
            {this.state.click ? (
              <a href="/#">{"Show only top comments"}</a>
            ) : (
              <a href="/#">
                {"View all"} <span>{this.props.comments.length}</span>
                {" comments"}
              </a>
            )}
          </div>
        ) : null}

        {this.renderComments()}
      </div>
    );
  }
}

export default commentList;
