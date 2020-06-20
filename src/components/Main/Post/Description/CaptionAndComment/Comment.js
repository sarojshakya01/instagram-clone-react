import React from "react";

const icon = {
  delete:
    "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  like: {
    white:
      "M34.3 3.5C27.2 3.5 24 8.8 24 8.8s-3.2-5.3-10.3-5.3C6.4 3.5.5 9.9.5 17.8s6.1 12.4 12.2 17.8c9.2 8.2 9.8 8.9 11.3 8.9s2.1-.7 11.3-8.9c6.2-5.5 12.2-10 12.2-17.8 0-7.9-5.9-14.3-13.2-14.3zm-1 29.8c-5.4 4.8-8.3 7.5-9.3 8.1-1-.7-4.6-3.9-9.3-8.1-5.5-4.9-11.2-9-11.2-15.6 0-6.2 4.6-11.3 10.2-11.3 4.1 0 6.3 2 7.9 4.2 3.6 5.1 1.2 5.1 4.8 0 1.6-2.2 3.8-4.2 7.9-4.2 5.6 0 10.2 5.1 10.2 11.3 0 6.7-5.7 10.8-11.2 15.6z",
    red:
      "M35.3 35.6c-9.2 8.2-9.8 8.9-11.3 8.9s-2.1-.7-11.3-8.9C6.5 30.1.5 25.6.5 17.8.5 9.9 6.4 3.5 13.7 3.5 20.8 3.5 24 8.8 24 8.8s3.2-5.3 10.3-5.3c7.3 0 13.2 6.4 13.2 14.3 0 7.8-6.1 12.3-12.2 17.8z",
  },
};

const Comment = (props) => {
  const handleClickLike = (e) => {
    props.handleClickLikeComment(e);
  };

  const handleClickDelete = (e) => {
    props.handleClickDeleteComment(e);
  };

  const { commentId, commentBy, mention, comment, likes } = props.comment;
  const { postBy, loginUser } = props;
  const liked = likes.indexOf(loginUser) > -1;

  let style = {
    fill: "",
  };

  let likeIcon;

  if (liked) {
    likeIcon = icon.like.red;
    style.fill = "#ed4956";
  } else {
    likeIcon = icon.like.white;
  }

  return (
    <div id={commentId} className="comment">
      <div className="comment-inner">
        <a
          className="comment-id"
          title={commentBy}
          href={"/" + commentBy + "/"}
        >
          {commentBy}
        </a>{" "}
        <span className="comment-content">
          <span>
            {mention && mention.length > 0 ? (
              <a href={"/" + mention + "/"}>{"@" + mention}</a>
            ) : null}{" "}
            {comment}
          </span>
        </span>
      </div>
      <div className="comment-like-count">
        {likes.length > 0 ? likes.length : null}
      </div>
      <span className="comment-like-span">
        <div className="comment-like">
          <button type="button" onClick={handleClickLike}>
            <svg style={style} height="12" viewBox="0 0 48 48" width="12">
              <path clipRule="evenodd" d={likeIcon} fillRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </span>
      {postBy === loginUser || commentBy === loginUser ? (
        <span className="comment-delete-span">
          <div className="comment-delete">
            <button type="button" onClick={handleClickDelete}>
              <svg height="24" viewBox="0 0 24 24" width="24">
                <path
                  clipRule="evenodd"
                  d={icon.delete}
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </span>
      ) : null}
    </div>
  );
};

export default Comment;
