import React from "react";
import classes from "./CalendarItem.module.scss";

const CalendarItem = ({
  date,
  hasCompletedTasks,
  hasUncompletedTasks,
  setActive,
  activeDay,
}) => {
  const className =
    new Date(activeDay).toDateString() === date.toDateString()
      ? classes.active
      : classes["non-active"];

  let weekDay = date.getDay();

  switch (weekDay) {
    case 0:
      weekDay = "Sun";
      break;
    case 1:
      weekDay = "Mon";
      break;
    case 2:
      weekDay = "Tue";
      break;
    case 3:
      weekDay = "Wed";
      break;
    case 4:
      weekDay = "Thu";
      break;
    case 5:
      weekDay = "Fri";
      break;
    case 6:
      weekDay = "Sat";
      break;
    default:
      weekDay = "Mon";
  }

  return (
    <div className={classes["calendar-item"]}>
      <div
        className={`${classes["calendar-item-container"]} ${className}`}
        onClick={() => setActive(date)}
        aria-hidden="true"
      >
        <p>{weekDay}</p>
        <p>{date.getDate()}</p>
        <p>{date.getMonth()}</p>
      </div>
      <div className={classes["tasks-monitoring"]}>
        {hasCompletedTasks && <span className={classes["tasks-completed"]} />}
        {hasUncompletedTasks && (
          <span className={classes["tasks-incompleted"]} />
        )}
      </div>
    </div>
  );
};

export default CalendarItem;
