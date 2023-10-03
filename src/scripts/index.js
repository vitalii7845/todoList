import { initTodoListHandlers } from './todoList.js';
import { renderTasks } from './render.js';
import { getTasksList } from './tasksGateway.js';
import { setItem } from './storage.js';

const onContentLoaded = () => {
  getTasksList().then(tasksList => {
    setItem('tasksList', tasksList);

    renderTasks();
  });

  initTodoListHandlers();
};

document.addEventListener('DOMContentLoaded', onContentLoaded);

const onStarageChange = event => {
  if (event.key !== 'tasksList') {
    return;
  }
  renderTasks();
};

window.addEventListener('storage', onStarageChange);
