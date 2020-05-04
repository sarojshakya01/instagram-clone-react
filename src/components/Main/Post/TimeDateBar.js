import React from "react";
import "./Post.css";

const TimeDateBar = (props) => {
  const postTime = props.postTime;
  const dateInt = Date.parse(postTime);

  let now = new Date();
  now = Date.parse(now);
  const diffSec = (now - dateInt) / 1000;
  let label = "";
  let roundedDiff = 0;

  if (diffSec < 60) {
    roundedDiff = Math.round(diffSec);
    label =
      roundedDiff.toString() +
      (roundedDiff > 1 ? " seconds" : " second") +
      " ago";
  } else if (diffSec / 60 < 60) {
    roundedDiff = Math.round(diffSec / 60);
    label =
      roundedDiff.toString() +
      (roundedDiff > 1 ? " minutes" : " minute") +
      " ago";
  } else if (diffSec / 3600 < 24) {
    roundedDiff = Math.round(diffSec / 3600);
    label =
      roundedDiff.toString() + (roundedDiff > 1 ? " hours" : "hour") + " ago";
  } else if (diffSec / 86400 < 30) {
    roundedDiff = Math.round(diffSec / 86400);
    label =
      roundedDiff.toString() + (roundedDiff > 1 ? " days" : " day") + " ago";
  } else if (diffSec / (86400 * 30) < 12) {
    roundedDiff = Math.round(diffSec / (86400 * 30));
    label =
      roundedDiff.toString() +
      (roundedDiff > 1 ? " months" : " month") +
      " ago";
  } else if (diffSec / 86400 < 365) {
    roundedDiff = Math.round(diffSec / 86400);
    label =
      roundedDiff.toString() + (roundedDiff > 1 ? " years" : " yeaar") + " ago";
  }

  return (
    <div className="igpost-time">
      <a href="/time/">
        <time dateTime={postTime} title={"title"}>
          {label}
        </time>
      </a>
    </div>
  );
};

export default TimeDateBar;
