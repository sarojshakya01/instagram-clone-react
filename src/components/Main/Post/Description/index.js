import React from "react";
import axios from "axios";
import IconBar from "./IconBar";
import LikeBar from "./LikeBar";
import CaptionAndComment from "./CaptionAndComment";
import TimeDateBar from "./TimeDateBar";
import AddComment from "./AddComment";
import "./Description.css";

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount = () => {
    this.setState({
      comments: this.props.postDetails.comments,
    });
  };

  extractComment = (response) => {
    const tempComments = response.data.map((cmnt) => {
      let comment = {
        commentBy: cmnt.commentby,
        mention: cmnt.mention,
        comment: cmnt.comment,
        likes: cmnt.likes,
      };
      return comment;
    });
    return tempComments;
  };

  handlePostComment = (value, postId) => {
    const newComment = {
      commentBy: this.props.postDetails.loginUser,
      mention:
        value.indexOf("@") > -1
          ? value.substring(
              value.indexOf("@") + 1,
              value.indexOf(" ") - value.indexOf("@")
            )
          : "",
      comment:
        value.indexOf("@") > -1
          ? value.substring(value.indexOf(" ") + 1)
          : value,
    };

    const params = {
      postId: postId + 1,
      commentBy: newComment.commentBy,
      mention: newComment.mention,
      comment: newComment.comment,
    };

    const that = this;
    axios
      .post("http://localhost:3001/addComment", null, { params: params })
      .then((response) => {
        if (response.data.length > 0) {
          const tempComments = this.extractComment(response);
          that.setState({
            comments: tempComments,
          });
        }
      });
  };

  render() {
    const likes = this.props.postDetails.likes;
    const caption = this.props.postDetails.caption;
    const postTime = this.props.postDetails.postTime;
    const loginUser = this.props.postDetails.loginUser;
    const likedPost = likes.indexOf(loginUser) > -1;

    return (
      <div className="igpost-description">
        <IconBar likedPost={likedPost} setLikePost={this.props.setLikePost} />
        {likes.length > 0 ? <LikeBar likes={likes} /> : null}
        <CaptionAndComment
          caption={caption}
          comments={this.state.comments}
          loginUser={loginUser}
        />
        <TimeDateBar postTime={postTime} />
        <AddComment handlePostComment={this.handlePostComment} />
      </div>
    );
  }
}

export default Description;
