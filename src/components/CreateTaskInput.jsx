import React from "react";

const CreateTaskInput = ({ slotModalHandler }) => {
  return (
    <div className="create-task">
      <button className="btn create-task__btn" onClick={slotModalHandler}>
        Create
      </button>
    </div>
  );
};

export default CreateTaskInput;
