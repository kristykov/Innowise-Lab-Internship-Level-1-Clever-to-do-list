import React from "react";
import s from "./CalendarItem.module.scss";

const CalendarItem = ({
  date,
  hasCompletedTasks,
  hasUncompletedTasks,
  setActive,
  activeDay,
}) => {
  const className =
    new Date(activeDay).toDateString() === date.toDateString()
      ? s.active
      : s["non-active"];

  let weekDay = date.getDay();
  let month = date.getMonth();

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
      break;
  }
  switch (month) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
    default:
      break;
  }

  return (
    <div className={s["calendar-item"]}>
      <div
        className={`${s["calendar-item-container"]} ${className}`}
        onClick={() => setActive(date)}
        aria-hidden="true"
      >
        <p>{weekDay}</p>
        <p>{date.getDate()}</p>
        <p>{month}</p>
      </div>
      <div className={s["tasks-monitoring"]}>
        {hasCompletedTasks && <span className={s["tasks-completed"]} />}
        {hasUncompletedTasks && <span className={s["tasks-incompleted"]} />}
      </div>
    </div>
  );
};

export default CalendarItem;
