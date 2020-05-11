import React from "react";
const ImageSlide = ({ postBy, photo }) => {
  return (
    <div className="igpost-image-bg">
      <div className="igpost-image-bg-content">
        <img alt={`Post by ${postBy}`} src={photo} />
      </div>
    </div>
  );
};

export default ImageSlide;
