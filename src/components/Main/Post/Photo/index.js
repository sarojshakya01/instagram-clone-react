import React from "react";
import "./Photo.css";
import Carousel from "./Carousel";

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
        <Carousel postBy={postBy} photoList={photo} />
        {/* <div className="igpost-image-bg">
          <div className="igpost-image-bg-content">
            <img alt={"Post by " + postBy} src={photo[0]} />
          </div>

          <div className="igpost-image-footer"></div>
        </div>
        {photo.length > 0 ? (
          <>
            <div className="slide-arrow slide-arrow-left" tabIndex="-1">
              <div className="slide-arrow-icon slide-arrow-icon-left"></div>
            </div>
            <div className="slide-arrow slide-arrow-right" tabIndex="-1">
              <div className="slide-arrow-icon slide-arrow-icon-right"></div>
            </div>
          </>
        ) : null} */}
      </div>
    </div>
  );
};

export default Photo;
