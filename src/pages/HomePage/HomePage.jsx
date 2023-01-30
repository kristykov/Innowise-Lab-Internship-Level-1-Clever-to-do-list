import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Calendar from "../../components/Calendar/Calendar";
import TaskList from "../../components/TaskList/TaskList";
import AddTask from "../../components/AddTask/AddTask";
import { userIdSelector } from "../../store/auth/authSlice";

const HomePage = () => {
  const hasUserId = useSelector(userIdSelector);

  return hasUserId ? (
    <>
      <Header />
      <Calendar />
      <TaskList />
      <AddTask />
    </>
  ) : (
    <h2>Unauthorized</h2>
  );
};

export default HomePage;
