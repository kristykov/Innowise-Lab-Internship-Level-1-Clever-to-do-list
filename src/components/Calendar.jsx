import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  activeDayAction,
  activeDay as selectActiveDay,
} from "../store/activeDay/activeDaySlice";
import { monthTasks } from "../store/monthTasks/monthTasksSlice";
import CalendarItem from "./CalendarItem";
import classes from "./Calendar.module.scss";

const Calendar = () => {
  const activeDay = useSelector(selectActiveDay);
  const allTasks = useSelector(monthTasks);

  const dispatch = useDispatch();

  const [firstMonthDays, setFirstMonthDays] = useState([]);
  const [days, setDays] = useState([]);
  const [trackedMonthDate, setTrackedMonthDate] = useState(new Date());

  const containerRef = useRef(null);

  const daysGroupBy = (daysToFilter, tasks) =>
    daysToFilter.map((day) => {
      const dayTasks = tasks.filter(
        (task) =>
          new Date(task.date.seconds * 1000).toDateString() ===
          day.day.toDateString(),
      );
      const hasCompletedTasks = dayTasks.some((task) => task.completed);
      const hasUncompletedTasks = dayTasks.some((task) => !task.completed);

      return {
        key: day.key,
        hasCompletedTasks,
        hasUncompletedTasks,
        date: day.day,
      };
    });

  // fill current month from today
  useEffect(() => {
    const date = new Date();

    const today = date.getDate();
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();

    const daysInMonth = [];
    for (let i = today; i <= lastDay; i += 1) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);
      daysInMonth.push({
        day,
        key: day.toISOString(),
      });
    }

    setFirstMonthDays(daysGroupBy(daysInMonth, allTasks));
  }, [allTasks]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const checkScroll = () => {
      if (
        container.scrollWidth - container.scrollLeft ===
        container.clientWidth
      ) {
        const nextMonthDate = new Date(
          trackedMonthDate.getFullYear(),
          trackedMonthDate.getMonth() + 1,
          1,
        );
        setTrackedMonthDate(nextMonthDate);
        // fill new month
        const lastDayNextMonth = new Date(
          nextMonthDate.getFullYear(),
          nextMonthDate.getMonth() + 1,
          0,
        ).getDate();

        const daysInNextMonth = [];
        for (let i = 1; i <= lastDayNextMonth; i += 1) {
          const day = new Date(
            nextMonthDate.getFullYear(),
            nextMonthDate.getMonth(),
            i,
          );

          daysInNextMonth.push({
            day,
            key: day.toISOString(),
          });
        }
        const groupedDaysInNextMonth = daysGroupBy(daysInNextMonth, allTasks);

        setDays([...firstMonthDays, ...groupedDaysInNextMonth]);
      }
    };

    container.addEventListener("scroll", checkScroll);
    // eslint-disable-next-line consistent-return
    return () => {
      container.removeEventListener("scroll", checkScroll);
    };
  }, [trackedMonthDate, allTasks, firstMonthDays, activeDay]);

  const onSetActive = (day) => {
    dispatch(activeDayAction.setActiveDay(day.getTime()));
  };

  return (
    <div className={classes.calendar} ref={containerRef}>
      <div className={classes["calendar-container"]}>
        {(days.length === 0 ? firstMonthDays : days).map((day) => (
          <CalendarItem
            hasCompletedTasks={day.hasCompletedTasks}
            hasUncompletedTasks={day.hasUncompletedTasks}
            key={day.key}
            date={day.date}
            setActive={onSetActive}
            activeDay={activeDay}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
