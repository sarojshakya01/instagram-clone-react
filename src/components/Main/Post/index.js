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
      likePost: false,
      prevLikePost: false,
      reactPost: false,
    };
    this.currentPost = 0;
    this.reactPost = false;
    this.like = {
      prevStatus: false,
      currStatus: false,
    };
  }

  extractPosts = (response) => {
    const imgUrl = "../../img/userdata/";
    let tempPosts = [];

    tempPosts = response.data.map((myPost) => {
      let post = {
        postBy: "",
        postByPhoto: "",
        photo: "",
        caption: { captionBy: "", caption: "" },
        like: 0,
        liked: null,
        comments: [],
        postTime: "",
      };

      post.postBy = myPost.postby;
      post.postByPhoto = imgUrl + myPost.postbyphoto;
      post.photo = imgUrl + myPost.photo;
      post.caption.captionBy = myPost.postby;
      post.caption.caption = myPost.caption;
      post.like = myPost.like;
      post.liked = myPost.liked;
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
    return tempPosts;
  };

  componentDidMount = () => {
    const that = this;

    axios.get("http://localhost:3001/post?").then(function (response) {
      let posts = that.extractPosts(response);
      that.setState(() => ({
        posts: posts,
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

    if (this.reactPost && this.like.currStatus !== this.like.prevStatus) {
      const params = {
        postid: this.currentPost + 1,
        liked: this.state.posts[this.currentPost].liked,
      };

      const that = this;

      axios
        .post("http://localhost:3001/react", null, { params: params })
        .then((response) => {
          if (response.data.length > 0) {
            let posts = that.extractPosts(response);
            that.reactPost = false;
            that.setState({
              posts: posts,
            });
          }
        });
    }
  };

  setLikePost = (e) => {
    const postIndex = parseInt(e.currentTarget.closest("article").id);
    let posts = this.state.posts;
    posts[postIndex].like = !posts[postIndex].liked ? posts[postIndex].like + 1 : posts[postIndex].like - 1;
    posts[postIndex].liked = !posts[postIndex].liked;
    this.currentPost = postIndex;
    this.like.prevStatus = this.state.posts[postIndex].liked;
    this.like.currStatus = !this.state.posts[postIndex].liked;
    this.reactPost = true;

    this.setState({
      posts: posts,
    });
  };

  setClickPost = (e) => {
    const postIndex = parseInt(e.currentTarget.closest("article").id);
    let posts = this.state.posts;
    posts[postIndex].like = !posts[postIndex].liked ? posts[postIndex].like + 1 : posts[postIndex].like - 1;
    posts[postIndex].liked = !posts[postIndex].liked;
    this.currentPost = postIndex;
    this.like.prevStatus = this.state.posts[postIndex].liked;
    this.like.currStatus = !this.state.posts[postIndex].liked;

    if (!this.like.currStatus) {
      this.reactPost = true;
      this.setState({
        posts: posts,
      });
    }
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
        <article key={index} className="igpost dark-off" id={index}>
          <Header postByInfo={postByInfo} />
          <Photo photo={postedPhoto} setClickPost={this.setClickPost} />
          <Description
            postDetail={postDetails}
            likePost={post.liked}
            setLikePost={this.setLikePost}
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
