import React, { useState } from "react";

const shareIcon =
  "M46.5 3.5h-45C.6 3.5.2 4.6.8 5.2l16 15.8 5.5 22.8c.2.9 1.4 1 1.8.3L47.4 5c.4-.7-.1-1.5-.9-1.5zm-40.1 3h33.5L19.1 18c-.4.2-.9.1-1.2-.2L6.4 6.5zm17.7 31.8l-4-16.6c-.1-.4.1-.9.5-1.1L41.5 9 24.1 38.3z";

const ShareButton = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
    alert("This functionality is in development process");
  };

  return (
    <button className="igpost-direct-action share" onClick={handleClick}>
      <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
        <path d={shareIcon}></path>
        <path d={"M14.7 48.4l2.9-.7"}></path>
      </svg>
    </button>
  );
};

export default ShareButton;