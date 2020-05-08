import React from "react";

const Photo = (props) => {
  const { postBy, photo } = props.photo;

  return (
    <div className="">
      <div
        className="igpost-image"
        role="button"
        tabIndex="0"
        onDoubleClick={props.setClickPost}
      >
        <div className="igpost-image-bg">
          <div className="igpost-image-bg-content">
            <img alt={"Post by " + postBy} src={photo} />
          </div>
          <div className="igpost-image-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default Photo;
