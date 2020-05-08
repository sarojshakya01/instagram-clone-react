import React from "react";

const LikeBar = (props) => {
  const likes = props.likes;
  const label = likes.length > 1 ? " likes" : " like";
  return (
    <section className="like-count">
      <div className="like-count-inner">
        <div className="like-count-content">
          <button type="button">
            <span>{likes.length}</span>
            {label}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LikeBar;
