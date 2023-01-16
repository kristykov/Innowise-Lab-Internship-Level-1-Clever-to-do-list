import React from "react";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";

const HomePage = () => (
  <>
    <Header />
    <Calendar />
    <TaskList />
    <AddTask />
  </>
);

export default HomePage;
