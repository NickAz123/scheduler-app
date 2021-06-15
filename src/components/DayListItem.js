import React from "react";
import "components/DayListItem.scss"

const classNames = require('classnames');

export default function DayListItem(props) {
  let listClass = "day-list__item day-list__item" + classNames({'--selected': props.selected}, {'--full': (props.spots === 0)});

  const formatSpots = function(spots) {
    if (spots === 0) {
      return "no spots remaining";
    }
    if (spots === 1) {
      return "1 spot remaining";
    }
    if (props.spots > 1) {
      return `${spots} spots remaining`;
    }
  };

  return (
    <li className={listClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}