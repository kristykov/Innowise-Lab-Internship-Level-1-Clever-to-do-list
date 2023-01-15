import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { activeDayAction, activeDay } from "../store/activeDay/activeDaySlice";
import CalendarItem from "./CalendarItem";
import classes from "./Calendar.module.scss";

const Calendar = () => {
  const selectedDay = useSelector(activeDay);
  const dispatch = useDispatch();

  const [days, setDays] = useState([]);
  const [activeSelectedDay, setActiveSelectedDay] = useState(selectedDay);
  const [trakingMonthDate, settrakingMonthDate] = useState(new Date());

  const containerRef = useRef(null);

  useEffect(() => {
    const date = new Date();
    const today = date.getDate();

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();

    // console.log("TODAY:", today);
    // console.log("LAST MONTH DAY:", lastDay);

    const daysInMonth = [];
    for (let i = today; i <= lastDay; i += 1) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);
      // const day2 = day.toString();
      // console.log("DAY:", day);
      // console.log("DAY2:", day2);
      daysInMonth.push({
        day,
        key: day.toISOString(),
      });
    }

    setDays(daysInMonth);
    // setCurrentMonth(date.getMonth());
  }, []);

  useEffect(() => {
    // const date = new Date();
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      if (
        container.scrollWidth - container.scrollLeft ===
        container.clientWidth
      ) {
        console.log("Traking", trakingMonthDate);
        const nextMonth = new Date(
          trakingMonthDate.getFullYear(),
          trakingMonthDate.getMonth() + 1,
          1,
        );
        settrakingMonthDate((prevState) => {
          const nextMonthToSet = new Date(
            prevState.getFullYear(),
            prevState.getMonth() + 1,
            1,
          );
          return nextMonthToSet;
        });

        // const nextMonth = new Date(currentMonth + 1);
        console.log("nextMonth", nextMonth);
        const lastDayNextMonth = new Date(
          nextMonth.getFullYear(),
          nextMonth.getMonth() + 1,
          0,
        ).getDate();

        const daysInNextMonth = [];
        for (let i = 1; i <= lastDayNextMonth; i += 1) {
          const day = new Date(
            nextMonth.getFullYear(),
            nextMonth.getMonth(),
            i,
          );
          // console.log("DAY:", day);
          daysInNextMonth.push({
            day,
            key: day.toISOString(),
          });
        }
        setDays((prevDays) => [...prevDays, ...daysInNextMonth]);
        // const nextMonthToSet = new Date(
        //   trakingMonthDate.getFullYear(),
        //   trakingMonthDate.getMonth() + 1,
        //   1,
        // );
        // settrakingMonthDate(nextMonthToSet);
        // console.log("NExt mont", nextMonthToSet);
      }
    };

    container.addEventListener("scroll", checkScroll);
    // eslint-disable-next-line consistent-return
    return () => {
      container.removeEventListener("scroll", checkScroll);
    };
  }, []);

  // useEffect(() => {
  //   const nextMonthToSet = new Date(
  //     trakingMonthDate.getFullYear(),
  //     trakingMonthDate.getMonth() + 1,
  //     1,
  //   );
  //   console.log("nextMonthToSet", nextMonthToSet);
  //   console.log("render");
  //   settrakingMonthDate(nextMonthToSet);
  // }, [days]);
  console.log("DAYS", days);

  // days.forEach((day) => {
  // console.log("DAY", day);
  // console.log("day.toISOString", day.toISOString());
  // });

  const onSetActive = (day) => {
    setActiveSelectedDay(day);
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
            activeDay={activeSelectedDay}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
