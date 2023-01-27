import React from "react";
import Header from "../../components/Header/Header";
import Calendar from "../../components/Calendar/Calendar";
import TaskList from "../../components/TaskList/TaskList";
import AddTask from "../../components/AddTask/AddTask";

const HomePage = () => (
  <>
    <Header />
    <Calendar />
    <TaskList />
    <AddTask />
  </>
);

export default HomePage;
