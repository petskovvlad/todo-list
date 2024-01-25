const baseUrl = 'https://646cfbcc7b42c06c3b2c6102.mockapi.io/api/v1/tasks/';

export const createTask = taskData => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(taskData),
  })
  .then(response => {
    if(!response.ok) {
      throw new Error('Failed to create task');
    }
  })
}

export const fetchTasksList = () => {
  return fetch(baseUrl)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
      })
}

export const updateTask = (taskId, taskData) => {
  return fetch(`${baseUrl}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(taskData),
  })
  .then(response => {
    if(!response.ok) {
      throw new Error('Failed to update task'); 
    }
  })
}

export const deleteTask = (taskID) => {
  return fetch(`${baseUrl}/${taskID}`, {
    method: 'DELETE'
  }).then(response => {
    if(!response.ok) {
      throw new Error('Failed to delete task');
    }
  });
}