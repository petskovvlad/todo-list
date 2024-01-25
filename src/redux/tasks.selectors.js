import { createSelector } from "reselect";

export const tasksListSelector = (state) => {
  return state.tasksList;
};

export const sortedTasksListSelector = createSelector(
  [tasksListSelector],
  (tasksList) => {
    return tasksList.slice().sort((a, b) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }

      return new Date(a.date) - new Date(b.date);
    });
  }
);
