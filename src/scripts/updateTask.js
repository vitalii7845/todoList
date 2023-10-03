import { renderTasks } from './render.js';
import { getItem, setItem } from './storage.js';
import { updateTask, getTasksList, deleteTask } from './tasksGateway.js';

export const onToggleTask = e => {
  const isCheckbox = e.target.classList.contains('list__item-checkbox');
  const isDeleteBtn = e.target.classList.contains('list__item-delete-btn');

  const taskId = e.target.parentNode.dataset.id;
  if (isDeleteBtn) {
    deleteTask(taskId);
    renderTasks();
  }

  const tasksList = getItem('tasksList');
  // console.log(e.target);
  const { text, createdDate } = tasksList.find(task => task.id === taskId);

  const done = e.target.checked;
  const updatedTask = {
    text,
    createdDate,
    done,
    finishDate: done ? new Date().toISOString() : null,
  };

  updateTask(taskId, updatedTask)
    .then(() => getTasksList())
    .then(newTasksList => {
      setItem('tasksList', newTasksList);
      renderTasks();
    });
};
