import React from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "../assets/edit.svg";
import DeleteIcon from "../assets/delete.svg";

const TaskListItem = ({ id, status, title }) => {
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);
  const navigate = useNavigate();

  const handleChange = (event, taskId, taskStatus) => {
    if (event.currentTarget.type === "checkbox") {
      firestore
        .collection("users")
        .doc(uid)
        .collection("todos")
        .doc(taskId)
        .update({
          completed: !taskStatus,
        });
    }
  };

  const handleEditTask = () => {
    navigate(`/task/${id}`);
  };
  const handleDeleteTask = () => {
    firestore.collection("users").doc(uid).collection("todos").doc(id).delete();
  };

  return (
    <li className="task-list-item" key={id}>
      {status}
      <label htmlFor={`checkbox-${id}`} className="task-list-item-label">
        {" "}
        {title}
        <input
          className="task-list-item-input"
          type="checkbox"
          name="xc"
          id={`checkbox-${id}`}
          onChange={(event) => handleChange(event, id, status)}
          checked={status}
        />
        <span className="task-list-item-checkmark" aria-hidden="true" />
      </label>
      <div className="task-list-icon-container">
        <EditIcon className="task-list-item-icon" onClick={handleEditTask} />
        <DeleteIcon
          className="task-list-item-icon"
          onClick={handleDeleteTask}
        />
      </div>
    </li>
  );
};

export default TaskListItem;
