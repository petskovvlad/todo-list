import React from "react";
import Task from "./Task";

const TasksList = ({
  tasks,
  handleTaskDelete,
  handleTaskStatusChange,
  handleTaskEdit,
}) => {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onChange={handleTaskStatusChange}
          onDelete={handleTaskDelete}
          onEdit={handleTaskEdit}
        />
      ))}
    </ul>
  );
};

export default TasksList;
