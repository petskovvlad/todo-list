import { TASKS_LIST_RECEIVED, TASKS_DATA_FETCHING } from "./tasks.actions";

const initialState = {
  tasksList: [],
  isDataFetching: true,
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_DATA_FETCHING:
      return {
        ...state,
        isDataFetching: true,
      };
    case TASKS_LIST_RECEIVED:
      return {
        ...state,
        tasksList: action.payload.tasksList,
        isDataFetching: false,
      };
    default: {
      return state;
    }
  }
};

export default tasksReducer;
