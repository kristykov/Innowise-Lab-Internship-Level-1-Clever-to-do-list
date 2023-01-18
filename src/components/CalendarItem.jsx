import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./CalendarItem.module.scss";
import { monthTasks } from "../store/monthTasks/monthTasksSlice";

const CalendarItem = ({ day, setActive, activeDay }) => {
  const allTasks = useSelector(monthTasks);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uncompletedTasks, setUncompletedTask] = useState([]);

  let isThereCompletedTasks;
  let isThereUncompletedTasks;

  useEffect(() => {
    setCompletedTasks(
      allTasks.filter((task) => task.completed === true),
      // JSON.parse(allTasks).filter((task) => task.completed === true),
    );
    setUncompletedTask(
      allTasks.filter((task) => task.completed === false),
      // JSON.parse(allTasks).filter((task) => task.completed === false),
    );
  }, [allTasks, activeDay]);

  completedTasks.forEach((task) => {
    if (
      new Date(task.date.seconds * 1000).getDate() === day.day.getDate() &&
      new Date(task.date.seconds * 1000).getDay() === day.day.getDay()
    ) {
      isThereCompletedTasks = true;
    }
  });
  uncompletedTasks.forEach((task) => {
    if (
      new Date(task.date.seconds * 1000).getDate() === day.day.getDate() &&
      new Date(task.date.seconds * 1000).getDay() === day.day.getDay()
    ) {
      isThereUncompletedTasks = true;
    }
  });

  const className =
    day.day.getDate() === new Date(activeDay).getDate() &&
    day.day.getDay() === new Date(activeDay).getDay()
      ? classes.active
      : classes["non-active"];

  let weekDay = day.day.getDay();

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
        onClick={() => setActive(day.day)}
        aria-hidden="true"
      >
        <p>{weekDay}</p>
        <p>{day.day.getDate()}</p>
      </div>
      <div className={classes["tasks-monitoring"]}>
        {isThereCompletedTasks && (
          <span className={classes["tasks-completed"]} />
        )}
        {isThereUncompletedTasks && (
          <span className={classes["tasks-incompleted"]} />
        )}
      </div>
    </div>
  );
};

export default CalendarItem;
