import React from "react";
import "./Post.css";

class PostOption extends React.Component {
  render() {
    return (
      <div className="igpost-option">
        <button>
          <div className="igpost-option-dot">
            <svg fill="#262626" height="16" viewBox="0 0 48 48" width="16">
              <circle
                clipRule="evenodd"
                cx="8"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
              <circle
                clipRule="evenodd"
                cx="24"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
              <circle
                clipRule="evenodd"
                cx="40"
                cy="24"
                fillRule="evenodd"
                r="4.5"
              ></circle>
            </svg>
          </div>
        </button>
      </div>
    );
  }
}

export default PostOption;
