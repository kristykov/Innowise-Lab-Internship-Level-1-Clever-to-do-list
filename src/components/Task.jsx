import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useForm } from "react-hook-form";
import { activeDayAction, activeDay } from "../store/activeDay/activeDaySlice";

import DeleteIcon from "../assets/delete.svg";
import BackIcon from "../assets/back.svg";
import { monthTasks } from "../store/monthTasks/monthTasksSlice";
import classes from "./Task.module.scss";

const Task = () => {
  const allTasks = useSelector(monthTasks);
  const { id } = useParams();
  const currentTask = JSON.parse(allTasks).find((task) => task.todoID === id);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedDay = useSelector(activeDay);
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const handleBack = () => {
    navigate("/home");
  };

  const onSubmit = (data) => {
    const title = data["new-task-title"];
    const description = data["new-task-description"];
    const completed = data.xc;

    if (title && !id) {
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
            });
        });
    } else if (title && id) {
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
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
  };

  if (id) {
    return (
      <form
        className={classes["new-task-form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes["task-header-container"]}>
          <BackIcon
            onClick={handleBack}
            className={`task-list-item-icon ${classes["task-list-item-back-icon"]} `}
          />
          <h2 className={classes["task-list-item-header"]}>Todays task</h2>
        </div>
        <div className={classes["new-task-title-container"]}>
          <label
            htmlFor="checkbox-new"
            className="task-list-item-label task-title"
          >
            {" "}
            <input
              {...register("xc")}
              className="task-list-item-input"
              type="checkbox"
              name="xc"
              id="checkbox-new"
            />
            <span className="task-list-item-checkmark" aria-hidden="true" />
          </label>
          <label htmlFor="new-task-title" className={classes["new-task-title"]}>
            <input
              {...register("new-task-title")}
              className={`${classes["new-task-input"]} ${classes["edit-task-input"]}`}
              name="new-task-title"
              type="text"
              id="new-task-title"
              placeholder={currentTask.title}
            />
          </label>
        </div>

        <label
          className={classes["new-task-description"]}
          htmlFor="new-task-description"
        >
          <textarea
            {...register("new-task-description")}
            className={classes["new-task-description-text"]}
            name="new-task-description"
            id="new-task-description"
            placeholder={
              currentTask.description
                ? currentTask.description
                : "Enter your task description"
            }
          />
        </label>
        <div className={classes["task-control-container"]}>
          <button className={classes["task-submit-btn"]} type="submit">
            Save
          </button>
          <DeleteIcon className="task-list-item-icon" />
        </div>
      </form>
    );
  }
  return (
    <form
      className={classes["new-task-form"]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={classes["task-header-container"]}>
        <BackIcon
          onClick={handleBack}
          className={`task-list-item-icon ${classes["task-list-item-back-icon"]} `}
        />
        <h2 className={classes["task-list-item-header"]}>Create a new Task</h2>
      </div>

      <div className={classes["new-task-title-container"]}>
        <label
          htmlFor="checkbox-new"
          className="task-list-item-label task-title"
        >
          {" "}
          <input
            {...register("xc")}
            className="task-list-item-input"
            type="checkbox"
            name="xc"
            id="checkbox-new"
          />
          <span className="task-list-item-checkmark" aria-hidden="true" />
        </label>
        <label htmlFor="new-task-title" className={classes["new-task-title"]}>
          <input
            {...register("new-task-title")}
            className={classes["new-task-input"]}
            name="new-task-title"
            type="text"
            id="new-task-title"
            placeholder="Enter your task title"
          />
        </label>
      </div>

      <label
        className={classes["new-task-description"]}
        htmlFor="new-task-description"
      >
        <textarea
          {...register("new-task-description")}
          className={classes["new-task-description-text"]}
          name="new-task-description"
          id="new-task-description"
          placeholder="Enter your task description"
        />
      </label>
      <button className={classes["task-submit-btn"]} type="submit">
        Create
      </button>
    </form>
  );
};

export default Task;
