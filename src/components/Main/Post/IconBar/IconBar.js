import React from "react";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import BookmarkButton from "./BookmarkButton";

import "../Post.css";

class IconBar extends React.Component {
  render() {
    return (
      <section className="igpost-direct">
        <LikeButton />
        <CommentButton />
        <ShareButton />
        <BookmarkButton />
      </section>
    );
  }
}

export default IconBar;
