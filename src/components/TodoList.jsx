import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import TasksList from "./TasksList";
import {
  getTaskList,
  updateTask,
  deleteTask,
  createTask,
  editTask,
} from "../redux/tasks.actions";
import CreateTaskInput from "./CreateTaskInput";
import { sortedTasksListSelector } from "../redux/tasks.selectors";
import Modal from "./Modal";
import CircularProgress from '@mui/material/CircularProgress';

const TodoList = ({
  tasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskList,
  editTask,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    date: "",
  });
  const [editingTask, setEditingTask] = useState(null);

  const isDataFetching = useSelector(state => state.isDataFetching);

  const slotModalHandler = () => {
    setIsOpen(!isOpen);
    setEditingTask(null);
    setFormData({
      description: "",
      date: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { description, date } = formData;

    try {
      await createTask(description, date);

      getTaskList();
      setIsOpen(false);
    } catch (error) {
      alert(`Internal Server Error. Can't display events`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    const { description, date, id } = task;
    setFormData({
      description,
      date,
      id,
    });
    setIsOpen(true);
  };

  const handleEdit = async (taskId, taskData) => {
    try {
      await editTask(taskId, taskData);

      getTaskList();
      setIsOpen(false);
    } catch (error) {
      alert(`Internal Server Error. Can't display tasks`);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <>
      <h1 className="title">Todo List</h1>
      <main className="todo-list">
        <CreateTaskInput
          onCreate={createTask}
          slotModalHandler={slotModalHandler}
        />
        {isOpen && (
          <Modal
            formData={formData}
            slotModalHandler={slotModalHandler}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            editingTask={editingTask}
            handleEdit={handleEdit}
          />
        )}
        {isDataFetching ? (
        <CircularProgress sx={{ marginTop: '36px' }} />
      ) : 
        <TasksList
          tasks={tasks}
          handleTaskStatusChange={updateTask}
          handleTaskDelete={deleteTask}
          handleTaskEdit={openEditModal}
        />
}
      </main>
    </>
  );
};

const mapState = (state) => {
  return {
    tasks: sortedTasksListSelector(state),
  };
};

const mapDispatch = {
  getTaskList,
  updateTask,
  deleteTask,
  createTask,
  editTask,
};

export default connect(mapState, mapDispatch)(TodoList);
