import React, { useState, useEffect } from "react";
import { useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { activeDay } from "../store/activeDay/activeDaySlice";
import { monthTasksAction } from "../store/monthTasks/monthTasksSlice";
import TaskListItem from "./TaskListItem";

import "./TaskList.scss";

const TaskList = () => {
  const firestore = useFirestore();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { uid } = useSelector((state) => state.firebase.auth);
  const [filteredAgainTasks, setFilteredTasks] = useState([]);
  const dispatch = useDispatch();

  const selectedDay = useSelector(activeDay);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const unsubscribe = firestore
      .collection("users")
      .doc(uid)
      .collection("todos")
      .orderBy("date")
      .onSnapshot(
        (snapshot) => {
          const newTasks = snapshot.docs.map((doc) => doc.data());
          setTasks(newTasks);
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, [firestore, uid]);

  useEffect(() => {
    if (tasks.length > 0) {
      const filteredNewTasks = tasks.filter(
        (task) =>
          new Date(task.date.seconds * 1000).getDate() ===
          new Date(selectedDay).getDate(),
      );

      setFilteredTasks(filteredNewTasks);
      dispatch(monthTasksAction.addTasks(JSON.stringify(tasks)));
    }
  }, [tasks, selectedDay]);

  return (
    <div className="container">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && (
        <>
          <h2 className="task-list-headline">
            Today {filteredAgainTasks.length}
            {filteredAgainTasks.length === 1 ? " task" : " tasks"}
          </h2>
          <ul className="task-list">
            {filteredAgainTasks.map((filteredTasks) => (
              <TaskListItem
                key={filteredTasks.todoID}
                id={filteredTasks.todoID}
                status={filteredTasks.completed}
                title={filteredTasks.title}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TaskList;
