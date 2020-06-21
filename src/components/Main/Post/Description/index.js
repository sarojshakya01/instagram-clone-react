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
      textareaValue: "",
      commentDataFetched: true,
    };
    this.postId = "";
  }

  componentDidMount = () => {
    this.setState({
      comments: this.props.postDetails.comments,
    });
  };

  extractComment = (response) => {
    const tempComments = response.data.map((cmnt, index) => {
      let comment = {
        commentId: `${this.postId}_${index}`,
        commentBy: cmnt.commentby,
        mention: cmnt.mention,
        comment: cmnt.comment,
        likes: cmnt.likes,
      };
      return comment;
    });
    return tempComments;
  };

  handleChange = (e) => {
    this.setState({ textareaValue: e.target.value });
  };

  postComment = (postId) => {
    if (this.state.textareaValue !== "") {
      const value = this.state.textareaValue;
      this.postId = postId;
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
        likes: [],
      };

      const params = {
        postId: postId + 1,
        commentBy: newComment.commentBy,
        mention: newComment.mention,
        comment: newComment.comment,
      };

      this.setState({ commentDataFetched: false });
      const self = this;

      // axios
      //   .post("http://localhost:3001/addComment", { params }, { timeout: 5000 })
      //   .then((response) => {
      //     const { comments } = { ...self.state };

      //     const newComment = {
      //       commentId: `${self.postId}_${comments.length}`,
      //       commentBy: response.data.commentby,
      //       mention: response.data.mention,
      //       comment: response.data.comment,
      //       likes: response.data.likes,
      //     };

      //     comments.push(newComment);
      //     self.setState({
      //       comments,
      //       textareaValue: "",
      //       commentDataFetched: true,
      //     });
      //   })
      //   .catch((err) => {
      //     self.setState({
      //       commentDataFetched: true,
      //     });
      //   });
    }
  };

  handlePostComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (this.state.textareaValue.trim() !== "") {
        const postId = parseInt(e.currentTarget.closest("article").id);
        this.postComment(postId);
      }
    }
  };

  handlePostCommentBtn = (e) => {
    const textareaElem = e.currentTarget.parentElement.elements[0];
    const postId = parseInt(textareaElem.closest("article").id);
    this.postComment(postId);
  };

  handleClickLikeComment = (e) => {
    const { id } = e.currentTarget.closest(".comment");
    let { comments } = { ...this.state };

    const postId = parseInt(id.split("_")[0]) + 1;
    const commentId = parseInt(id.split("_")[1]);
    const likedBy = this.props.postDetails.loginUser;
    const liked = comments[commentId].likes.indexOf(likedBy) === -1;

    const oldLikes = [...comments[commentId].likes];

    const params = {
      postId,
      commentId,
      likedBy,
      liked,
    };

    const self = this;
    // axios
    //   .post("http://localhost:3001/likeComment", { params }, { timeout: 5000 })
    //   .then((response) => {
    //     let { comments } = { ...self.state };
    //     comments[commentId].likes = response.data;
    //     self.setState({ comments });
    //   })
    //   .catch((err) => {
    //     let { comments } = { ...self.state };
    //     comments[commentId].likes = oldLikes;
    //     self.setState({ comments });
    //   });

    // for quick fake response, update the state. Later, actual state will be updated from API response
    if (liked) {
      comments[commentId].likes.push(likedBy);
    } else {
      comments[commentId].likes.splice(
        comments[commentId].likes.indexOf(likedBy)
      );
    }

    this.setState({ comments });
  };

  handleClickDeleteComment = (e) => {
    const { id } = e.currentTarget.closest(".comment");
    let { comments } = { ...this.state };

    const postId = parseInt(id.split("_")[0]) + 1;
    const commentId = parseInt(id.split("_")[1]);

    const oldComments = JSON.parse(JSON.stringify(comments));
    this.postId = postId - 1;

    const params = {
      postId,
      commentId,
    };

    const self = this;
    // axios
    //   .post(
    //     "http://localhost:3001/deleteComment",
    //     { params },
    //     { timeout: 5000 }
    //   )
    //   .then((response) => {
    //     if (response.data.length > 0) {
    //       const newComments = self.extractComment(response);
    //       self.setState({ comments: newComments });
    //     }
    //   })
    //   .catch((err) => {
    //     self.setState({ comments: oldComments });
    //   });

    // for quick fake response, update the state. Later, actual state will be updated from API response
    comments.splice(commentId, 1);

    this.setState({ comments });
  };

  render() {
    const {
      postBy,
      likes,
      caption,
      postTime,
      loginUser,
    } = this.props.postDetails;
    const likedPost = likes.indexOf(loginUser) > -1;

    return (
      <div className="igpost-description">
        <IconBar likedPost={likedPost} setLikePost={this.props.setLikePost} />
        {likes.length > 0 ? <LikeBar likes={likes} /> : null}
        <CaptionAndComment
          postBy={postBy}
          caption={caption}
          comments={this.state.comments}
          loginUser={loginUser}
          handleClickLikeComment={this.handleClickLikeComment}
          handleClickDeleteComment={this.handleClickDeleteComment}
        />
        <TimeDateBar postTime={postTime} />
        <AddComment
          value={this.state.textareaValue}
          dataFetched={this.state.commentDataFetched}
          handleChange={this.handleChange}
          handlePostComment={this.handlePostComment}
          handlePostCommentBtn={this.handlePostCommentBtn}
        />
      </div>
    );
  }
}

export default Description;
