import React from "react";
import axios from "axios";
import Header from "./Header";
import Photo from "./Photo";
import Description from "./Description";
import PostOption from "./PostOption";
import PostFooter from "./PostFooter";
import "./Post.css";

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      fetchedPost: false,
      clickPost: false,
    };
  }

  componentDidMount = () => {
    const that = this;
    const imgUrl = "../../img/userdata/";
    let tempPosts = [];

    axios.get("http://localhost:3001/post?").then(function (response) {
      tempPosts = response.data.map((myPost) => {
        let post = {
          postBy: "",
          postByPhoto: "",
          photo: "",
          caption: { captionBy: "", caption: "" },
          like: 0,
          comments: [],
          postTime: "",
        };
        post.postBy = myPost.postby;
        post.postByPhoto = imgUrl + myPost.postbyphoto;
        post.photo = imgUrl + myPost.photo;
        post.caption.captionBy = myPost.postby;
        post.caption.caption = myPost.caption;
        post.like = myPost.like;
        post.postTime = myPost.posttime;

        post.comments = myPost.comments.map((cmnt) => {
          let tempComment = { commentBy: "", mention: "", comment: "" };
          tempComment.commentBy = cmnt.commentby;
          tempComment.mention = cmnt.mention;
          tempComment.comment = cmnt.comment;
          return tempComment;
        });
        return post;
      });
      that.setState(() => ({
        posts: tempPosts,
        fetchedPost: true,
      }));
    });
  };

  componentDidUpdate = () => {
    if (this.props.darkTheme) {
      const container = document.getElementById("igpost-main");
      const elems = container.getElementsByClassName("dark-off");

      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.add("dark");
      }
    } else {
      const elems = document.getElementsByClassName("dark-off");

      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove("dark");
      }
    }
  };

  setClickPost = () => {
    this.setState({
      clickPost: true,
    });
  };

  renderPosts = () => {
    const postList = this.state.posts;
    const posts = postList.map((post, index) => {
      const postBy = post.postBy;
      const postByPhoto = post.postByPhoto;
      const photo = post.photo;
      const caption = post.caption;
      const like = post.like;
      const comments = post.comments;
      const postTime = post.postTime;
      const postByInfo = {
        postBy: postBy,
        postByPhoto: postByPhoto,
      };
      const postedPhoto = {
        postBy: postBy,
        photo: photo,
      };
      const postDetails = {
        caption: caption,
        like: like,
        comments: comments,
        postTime: postTime,
      };
      return (
        <article key={index} className="igpost dark-off">
          <Header postByInfo={postByInfo} />
          <Photo photo={postedPhoto} setClickPost={this.setClickPost} />
          <Description
            postDetail={postDetails}
            clickPost={this.state.clickPost}
          />
          <PostOption />
        </article>
      );
    });
    return posts;
  };

  render() {
    return (
      <div id="igpost-main" className="igpost-outer">
        <div className="">
          <div className="igpost-container">{this.renderPosts()}</div>
        </div>
        {!this.state.fetchedPost ? <PostFooter /> : null}
      </div>
    );
  }
}

export default Post;
