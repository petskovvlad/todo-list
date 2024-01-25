import * as tasksGateway from "../gateway/tasks.gateway";
import { tasksListSelector } from "./tasks.selectors";

export const TASKS_LIST_RECEIVED = "TASKS_LIST_RECEIVED";
export const TASKS_DATA_FETCHING = 'TASKS_DATA_FETCHING';

export const tasksListRecieved = (tasksList) => {
  return {
    type: TASKS_LIST_RECEIVED,
    payload: {
      tasksList,
    },
  };
};

export const tasksDataFetching = () => {
  return {
    type: TASKS_DATA_FETCHING,
  };
};

export const getTaskList = () => {
  return function (dispatch) {
    tasksGateway
      .fetchTasksList()
      .then((tasksList) => dispatch(tasksListRecieved(tasksList)));
  };
};

export const updateTask = (taskId, taskData) => {
  return function (dispatch, getState) {
    const state = getState();
    const tasksList = tasksListSelector(state);
    const task = tasksList.find((task) => task.id === taskId);
    const updatedTask = {
      ...task,
      taskData,
      done: !task.done,
    };
    tasksGateway
      .updateTask(taskId, updatedTask)
      .then(() => dispatch(getTaskList()));
  };
};

export const deleteTask = (taskId) => {
  return function (dispatch) {
    tasksGateway.deleteTask(taskId).then(() => dispatch(getTaskList()));
  };
};

export const createTask = (description, date) => {
  return function (dispatch) {
    const taskData = {
      description,
      date,
      done: false,
      createDate: new Date().toISOString(),
    };
    tasksGateway.createTask(taskData).then(() => dispatch(getTaskList()));
  };
};

export const editTask = (taskId, taskData) => {
  return function (dispatch) {
    tasksGateway
      .updateTask(taskId, taskData)
      .then(() => dispatch(getTaskList()));
  };
};
