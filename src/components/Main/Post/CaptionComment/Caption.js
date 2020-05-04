import React from "react";
import "../Post.css";

const Caption = (props) => {
  const captionBy = props.caption.captionBy;
  const caption = props.caption.caption;
  return (
    <div className="caption">
      <div className="caption-inner">
        <a
          className="caption-by"
          title={captionBy}
          href={"/" + captionBy + "/"}
        >
          {captionBy}
        </a>{" "}
        <span className="caption-content">
          <span>{caption}</span>
        </span>
      </div>
    </div>
  );
};

export default Caption;
