import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import { activeDay } from "../store/activeDay/activeDaySlice";

const HomePage = () => {
  const selectedDay = useSelector(activeDay);
  let currentmonth = new Date(selectedDay).getMonth();

  switch (currentmonth) {
    case 0:
      currentmonth = "January";
      break;
    case 1:
      currentmonth = "February";
      break;
    case 2:
      currentmonth = "March";
      break;
    case 3:
      currentmonth = "April";
      break;
    case 4:
      currentmonth = "May";
      break;
    case 5:
      currentmonth = "June";
      break;
    case 6:
      currentmonth = "July";
      break;
    case 7:
      currentmonth = "August";
      break;
    case 8:
      currentmonth = "September";
      break;
    case 9:
      currentmonth = "October";
      break;
    case 10:
      currentmonth = "November";
      break;
    case 11:
      currentmonth = "December";
      break;
    default:
      currentmonth = "January";
  }

  return (
    <>
      <Header />
      <h1>{currentmonth}</h1>
      <Calendar />
      <TaskList />
      <AddTask />
    </>
  );
};

export default HomePage;
