import React from "react";
import DayListItem from "components/DayListItem";

export function DayList(props) {
  const { days } = props;

  const list = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{list}</ul>;
}
