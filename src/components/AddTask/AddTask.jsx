import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../elements/Button";

const AddTask = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/task");
  };
  return (
    <div className="container">
      <Button className="add-task-btn" onClick={handleClick} type="add-task">
        + add a New Task
      </Button>
    </div>
  );
};

export default AddTask;
