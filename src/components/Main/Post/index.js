import React from "react";
import axios from "axios";
import Header from "./Header";
import Photo from "./Photo/";
import Description from "./Description/";
import PostOption from "./PostOption";
import PostFooter from "./PostFooter";
import "./Post.css";
import { API_URL } from "../../../config";

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      fetchedPost: false,
    };
    this.currentPost = 0;
    this.prevPosts = [];
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
          photo: myPost.photo.map((photo) => {
            return imgUrl + photo;
          }),
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
    const self = this;
    const params = {
      postId: "",
    };

    axios
      .get(API_URL + "post/all", { params }, { timeout: 5000 })
      .then((response) => {
        let posts = self.extractPosts(response);
        self.setState(() => ({
          posts: posts,
          fetchedPost: true,
        }));
      })
      .catch(() => {
        self.setState(() => ({
          posts: [],
          fetchedPost: true,
        }));
      });
  };

  componentDidUpdate = () => {
    if (this.context.theme === "dark") {
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

  handleLikePost = (liked) => {
    const params = {
      postId: this.currentPost + 1, // id in db is 1 more
      liked: liked,
    };

    const self = this;

    axios
      .post(API_URL + "api/post/like", { params }, { timeout: 5000 })
      .then((response) => {
        let { posts } = { ...self.state };
        posts[self.currentPost].likes = response.data;
        self.setState({
          posts,
        });
      })
      .catch(() => {
        // roll back the changes
        self.setState({
          posts: self.prevPosts,
        });
      });
  };

  setLikePost = (e) => {
    const postIndex = parseInt(e.currentTarget.closest("article").id);
    this.prevPosts = JSON.parse(JSON.stringify(this.state.posts));

    let { posts } = { ...this.state };
    const { loginUser } = posts[postIndex];
    const indexOfPostLiker = posts[postIndex].likes.indexOf(loginUser);

    this.currentPost = postIndex;

    this.handleLikePost(indexOfPostLiker === -1);

    // for quick fake response, update the state. Later, actual state will be updated from API response
    indexOfPostLiker > -1
      ? posts[postIndex].likes.splice(indexOfPostLiker, 1)
      : posts[postIndex].likes.push(loginUser);

    this.setState({
      posts,
    });
  };

  setClickPost = (e) => {
    const postIndex = parseInt(e.currentTarget.closest("article").id);
    this.prevPosts = JSON.parse(JSON.stringify(this.state.posts));

    let { posts } = this.state;
    const { loginUser } = posts[postIndex];
    const indexOfPostLiker = posts[postIndex].likes.indexOf(loginUser);

    this.currentPost = postIndex;

    if (indexOfPostLiker === -1) {
      this.handleLikePost(true);

      // for quick fake response, update the state. Later, actual state will be updated from API response
      posts[postIndex].likes.push(loginUser);
      this.setState({
        posts,
      });
    }
  };

  renderPosts = () => {
    const { posts } = this.state;
    const postList = posts.map((post, index) => {
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
        postBy: post.postBy,
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
    return postList;
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
