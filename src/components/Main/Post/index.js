import React from "react";
import axios from "axios";
import Header from "./Header";
import Photo from "./Photo";
import Description from "./Description/";
import PostOption from "./PostOption";
import PostFooter from "./PostFooter";
import "./Post.css";

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      fetchedPost: false,
    };
    this.currentPost = 0;
    this.reactPost = false;
    this.alreadyReacted = false;
  }

  extractPosts = (response) => {
    const imgUrl = "../../img/userdata/";
    let tempPosts = [];

    if (response.data.length > 0) {
      const loginUser = response.data[0].loginUser;
      for (let i = 1; i < response.data.length; i++) {
        let myPost = response.data[i];
        let post = {
          loginUser: loginUser,
          postBy: myPost.postby,
          location: myPost.location,
          postByPhoto: imgUrl + myPost.postbyphoto,
          photo: imgUrl + myPost.photo,
          caption: { captionBy: myPost.postby, caption: myPost.caption },
          likes: myPost.likes,
          comments: myPost.comments.map((cmnt, index) => {
            let tempComment = {
              commentId: (i - 1).toString() + "_" + index.toString(),
              commentBy: cmnt.commentby,
              mention: cmnt.mention,
              comment: cmnt.comment,
              likes: cmnt.likes,
            };
            return tempComment;
          }),
          postTime: myPost.posttime,
        };

        tempPosts.push(post);
      }
    }

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

    if (this.reactPost && !this.alreadyReacted) {
      const params = {
        postId: this.currentPost + 1,
        liked:
          this.state.posts[this.currentPost].likes.indexOf(
            this.state.posts[this.currentPost].loginUser
          ) > -1,
      };

      const that = this;

      axios
        .post("http://localhost:3001/likePost", null, { params: params })
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
    const loginUser = posts[postIndex].loginUser;

    const indexOfUser = posts[postIndex].likes.indexOf(loginUser);

    indexOfUser === -1
      ? posts[postIndex].likes.push(loginUser)
      : posts[postIndex].likes.splice(indexOfUser, 1);
    this.currentPost = postIndex;

    this.reactPost = true;
    this.alreadyReacted = false;

    this.setState({
      posts: posts,
    });
  };

  setClickPost = (e) => {
    const postIndex = parseInt(e.currentTarget.closest("article").id);
    let posts = this.state.posts;
    const loginUser = posts[postIndex].loginUser;

    const indexOfUser = posts[postIndex].likes.indexOf(loginUser);

    if (indexOfUser === -1) {
      posts[postIndex].likes.push(loginUser);
      this.reactPost = true;
      this.alreadyReacted = false;
      this.setState({
        posts: posts,
      });
    } else {
      this.alreadyReacted = true;
    }
  };

  renderPosts = () => {
    const postList = this.state.posts;
    const posts = postList.map((post, index) => {
      const postByInfo = {
        postBy: post.postBy,
        postByPhoto: post.postByPhoto,
        location: post.location,
      };
      const postedPhoto = {
        postBy: post.postBy,
        photo: post.photo,
      };
      const postDetails = {
        loginUser: post.loginUser,
        caption: post.caption,
        likes: post.likes,
        comments: post.comments,
        postTime: post.postTime,
      };
      return (
        <article key={index} className="igpost dark-off" id={index}>
          <Header postByInfo={postByInfo} />
          <Photo photo={postedPhoto} setClickPost={this.setClickPost} />
          <Description
            postDetails={postDetails}
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
