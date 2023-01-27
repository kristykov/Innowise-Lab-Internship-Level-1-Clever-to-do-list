import React, { useState, useEffect } from "react";
import { useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { activeDay } from "../../store/activeDay/activeDaySlice";
import { monthTasksAction } from "../../store/monthTasks/monthTasksSlice";
import TaskListItem from "../TaskListItem/TaskListItem";

import "./TaskList.scss";

const TaskList = () => {
  const firestore = useFirestore();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { uid } = useSelector((state) => state.firebase.auth);
  const [filteredTasks, setFilteredTasks] = useState([]);

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
          dispatch(monthTasksAction.addTasks(newTasks));
          // dispatch(monthTasksAction.addTasks(JSON.stringify(tasks)));
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, [dispatch, firestore, uid]);

  useEffect(() => {
    if (tasks.length > 0) {
      const filteredTasksArray = tasks.filter(
        (task) =>
          new Date(task.date.seconds * 1000).toDateString() ===
          new Date(selectedDay).toDateString(),
      );

      setFilteredTasks(filteredTasksArray);
    }
  }, [tasks, selectedDay, firestore, uid]);

  return (
    <div className="container">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && (
        <>
          <h2>
            Today {filteredTasks.length}
            {filteredTasks.length === 1 ? " task" : " tasks"}
          </h2>
          <h4 className="task-list-headline">
            {new Date(selectedDay).toDateString()}
          </h4>
          <ul className="task-list">
            {filteredTasks.map((task) => (
              <TaskListItem
                key={task.todoID}
                id={task.todoID}
                status={task.completed}
                title={task.title}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TaskList;
