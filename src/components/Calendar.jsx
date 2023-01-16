import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  activeDayAction,
  activeDay as selectActiveDay,
} from "../store/activeDay/activeDaySlice";
import CalendarItem from "./CalendarItem";
import classes from "./Calendar.module.scss";

const Calendar = () => {
  const activeDay = useSelector(selectActiveDay);
  const dispatch = useDispatch();

  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(activeDay);
  const [trackedMonthDate, setTrackedMonthDate] = useState(new Date());

  const containerRef = useRef(null);

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

    setDays(daysInMonth);
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
        setDays((prevDays) => [...prevDays, ...daysInNextMonth]);
      }
    };

    container.addEventListener("scroll", checkScroll);
    // eslint-disable-next-line consistent-return
    return () => {
      container.removeEventListener("scroll", checkScroll);
    };
  }, [trackedMonthDate]);

  const onSetActive = (day) => {
    setSelectedDay(day);
    dispatch(activeDayAction.setActiveDay(day.getTime()));
  };

  return (
    <div className={classes.calendar} ref={containerRef}>
      <div className={classes["calendar-container"]}>
        {days.map((day) => (
          <CalendarItem
            key={day.key}
            day={day}
            setActive={onSetActive}
            activeDay={selectedDay}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
