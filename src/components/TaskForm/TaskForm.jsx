import React from "react";
import BackIcon from "../../assets/back.svg";
import DeleteIcon from "../../assets/delete.svg";
import s from "../Task/Task.module.scss";

const TaskForm = ({
  id,
  register,
  handleSubmit,
  currentTask,
  handleBack,
  loading,
}) => (
  <form className={s["new-task-form"]} onSubmit={handleSubmit}>
    <div className={s["task-header-container"]}>
      <BackIcon
        onClick={handleBack}
        className={`${s["task-list-item-icon"]} ${s["task-list-item-back-icon"]} `}
      />
      {id ? (
        <h2 className={s["task-list-item-header"]}>Todays task</h2>
      ) : (
        <h2 className={s["task-list-item-header"]}>Create a new Task</h2>
      )}
    </div>
    {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
    <div className={s["new-task-title-container"]}>
      <label htmlFor="checkbox-new" className="task-list-item-label task-title">
        <input
          {...register("xc")}
          className="task-list-item-input"
          type="checkbox"
          name="xc"
          id="checkbox-new"
        />
        <span className="task-list-item-checkmark" aria-hidden="true" />
      </label>
      <label htmlFor="new-task-title" className={s["new-task-title"]}>
        <input
          {...register("new-task-title")}
          className={`${s["new-task-input"]} ${
            id ? s["edit-task-input"] : null
          }`}
          name="new-task-title"
          type="text"
          id="new-task-title"
          placeholder={id ? currentTask.title : "Enter your task title"}
        />
      </label>
    </div>

    <label className={s["new-task-description"]} htmlFor="new-task-description">
      <textarea
        {...register("new-task-description")}
        className={s["new-task-description-text"]}
        name="new-task-description"
        id="new-task-description"
        placeholder={
          id ? currentTask.description : "Enter your task description"
        }
      />
    </label>
    {id ? (
      <div className={s["task-control-container"]}>
        <button className={s["task-submit-btn"]} type="submit">
          Save
        </button>
        <DeleteIcon className="task-list-item-icon" />
      </div>
    ) : (
      <button className={s["task-submit-btn"]} type="submit">
        Create
      </button>
    )}
  </form>
);

export default TaskForm;
