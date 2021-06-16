import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require("classnames");

export default function InterviewerListItem(props) {
  const listClass =
    "interviewers__item" + classNames({ "--selected": props.selected });

  const displayName = function () {
    if (props.selected) {
      return props.name;
    } else {
      return "";
    }
  };

  return (
    <li className={listClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {displayName()}
    </li>
  );
}
