import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  activeDayAction,
  activeDay as selectActiveDay,
} from "../../store/activeDay/activeDaySlice";
import { monthTasks } from "../../store/monthTasks/monthTasksSlice";
import CalendarItem from "../CalendarItem/CalendarItem";
import s from "./Calendar.module.scss";

const Calendar = () => {
  const activeDay = useSelector(selectActiveDay);
  const allTasks = useSelector(monthTasks);

  const dispatch = useDispatch();

  const [days, setDays] = useState([]);
  const [trackedMonthDate, setTrackedMonthDate] = useState(
    new Date().getMonth(),
  );

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
    let daysToBeRendered;
    const today = date.getDate();
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    if (lastDay - today < 8) {
      const nextMonthLastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 2,
        0,
      ).getDate();
      daysToBeRendered = nextMonthLastDay + lastDay;
      setTrackedMonthDate(new Date().getMonth() + 1);
    } else {
      daysToBeRendered = lastDay;
    }

    const daysInMonth = [];
    for (let i = today; i <= daysToBeRendered; i += 1) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);
      daysInMonth.push({
        day,
        key: day.toISOString(),
      });
    }
    setDays(daysGroupBy(daysInMonth, allTasks));
  }, []);

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
          new Date().getFullYear(),
          trackedMonthDate + 1,
          1,
        );
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

        setDays([...days, ...groupedDaysInNextMonth]);
        setTrackedMonthDate(nextMonthDate.getMonth());
      }
    };

    container.addEventListener("scroll", checkScroll);
    // eslint-disable-next-line consistent-return
    return () => {
      container.removeEventListener("scroll", checkScroll);
    };
  }, [trackedMonthDate, allTasks]);

  console.log(days);

  const onSetActive = (day) => {
    dispatch(activeDayAction.setActiveDay(day.getTime()));
  };

  return (
    <div className={s.calendar} ref={containerRef}>
      <div className={s["calendar-container"]}>
        {days.map((day) => (
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
