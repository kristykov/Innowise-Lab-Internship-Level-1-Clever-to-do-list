import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useForm } from "react-hook-form";
import {
  activeDayAction,
  activeDay,
} from "../../store/activeDay/activeDaySlice";

import { monthTasks } from "../../store/monthTasks/monthTasksSlice";
import TaskForm from "../TaskForm/TaskForm";

const Task = () => {
  const allTasks = useSelector(monthTasks);
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const currentTask = allTasks.find((task) => task.todoID === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedDay = useSelector(activeDay);
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);
  const [loading, isLoading] = useState(false);

  const handleBack = () => {
    navigate("/home");
  };

  const onSubmit = (data) => {
    isLoading(true);
    const title = data["new-task-title"];
    const description = data["new-task-description"];
    const completed = data.xc;

    if (!title) {
      return;
    }

    if (!id) {
      firestore
        .collection("users")
        .doc(uid)
        .collection("todos")
        .add({
          title,
          description,
          date: new Date(selectedDay),
          completed,
        })
        .then((docRef) => {
          docRef
            .update({
              todoID: docRef.id,
            })
            .then(() => {
              dispatch(
                activeDayAction.setActiveDay(new Date(selectedDay).getTime()),
              );
              navigate("/home");
              isLoading(false);
            });
        });
    } else {
      firestore
        .collection("users")
        .doc(uid)
        .collection("todos")
        .doc(id)
        .update({
          title,
          description,
          date: new Date(selectedDay),
          completed,
        })
        .then(() => {
          dispatch(
            activeDayAction.setActiveDay(new Date(selectedDay).getTime()),
          );
          navigate("/home");
          isLoading(false);
        })
        .catch((error) => {
          isLoading(false);
          console.error("Error updating document: ", error);
        });
    }
  };

  return (
    <TaskForm
      loading={loading}
      id={id}
      handleSubmit={handleSubmit(onSubmit)}
      currentTask={currentTask}
      handleBack={handleBack}
      register={register}
    />
  );
};

export default Task;
