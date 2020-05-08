import React from "react";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import BookmarkButton from "./BookmarkButton";
import "./IconBar.css";

const IconBar = (props) => {
  return (
    <section className="igpost-direct">
      <LikeButton likedPost={props.likedPost} setLikePost={props.setLikePost} />
      <CommentButton />
      <ShareButton />
      <BookmarkButton />
    </section>
  );
};

export default IconBar;
