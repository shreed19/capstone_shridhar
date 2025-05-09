document.addEventListener('DOMContentLoaded', function() {
  const previousTaskListContainer = document.getElementById('previousTasksDisplay');

  // Function to get tasks stored from the previous day (mockup with local storage)
  function getPreviousDayTasks() {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split('T')[0];

    return allTasks.filter(task => task.dueDate === yesterdayDate);
  }

  // Render previous day's tasks
  function renderPreviousDayTasks() {
    const tasks = getPreviousDayTasks();

    if (tasks.length === 0) {
      previousTaskListContainer.innerHTML = `
        <p class="text-center text-xl text-gray-600">No tasks completed or pending from yesterday.</p>
      `;
      return;
    }

    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task', `priority-${task.priority.toLowerCase()}`);
      taskDiv.innerHTML = `
        <div>
          <h3 class="font-bold">${task.title}</h3>
          <p>${task.description}</p>
          <p>Due: ${task.dueDate}</p>
        </div>
        <div class="flex space-x-4">
          <p class="text-lg ${task.status === 'completed' ? 'text-green-500' : 'text-red-500'}">
            ${task.status === 'completed' ? 'Completed' : 'Incomplete'}
          </p>
        </div>
      `;
      previousTaskListContainer.appendChild(taskDiv);
    });
  }

  renderPreviousDayTasks();
});
