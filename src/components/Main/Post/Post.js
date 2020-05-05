import React from "react";
import Header from "./Header";
import Photo from "./Photo";
import Description from "./Description";
import PostOption from "./PostOption";
import PostFooter from "./PostFooter";
import "./Post.css";

class Post extends React.Component {
  renderPosts = () => {
    const postList = this.props.posts;
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
        <article key={index} className="igpost dark-need">
          <Header postByInfo={postByInfo} />
          <Photo photo={postedPhoto} />
          <Description postDetail={postDetails} />
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
        <PostFooter />
      </div>
    );
  }
}

export default Post;
