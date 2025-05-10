
function renderPreviousTask(task) {
  const li = document.createElement("li");
  li.className =
    "border-l-4 p-4 rounded shadow-sm bg-white flex justify-between items-start " +
    (task.priority === "high"
      ? "border-red-500"
      : task.priority === "medium"
      ? "border-yellow-400"
      : "border-green-500");

  const taskContent = document.createElement("div");
  taskContent.innerHTML = `
    <h3 class="text-lg font-bold text-green-600">${task.title}</h3>
    ${task.description ? `<p>${task.description}</p>` : ""}
    ${task.tags ? `<p class="text-xs text-gray-500">Tags: ${task.tags}</p>` : ""}
    <p class="text-xs text-gray-500">Completed on: ${task.dueDate} ${formatTime(task.dueTime)}</p>
    <span class="inline-block px-2 py-1 mt-1 text-xs font-semibold text-white rounded ${
      task.priority === "high"
        ? "bg-red-500"
        : task.priority === "medium"
        ? "bg-yellow-500"
        : "bg-green-500"
    }">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
  `;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.className = "text-red-500 hover:text-red-700 ml-4";
  deleteBtn.addEventListener("click", () => {
    
    taskList.removeChild(li);
    
    
    const previousTasks = JSON.parse(localStorage.getItem('previousTasks')) || [];
    const updatedTasks = previousTasks.filter(t => 
      t.title !== task.title || 
      t.dueDate !== task.dueDate || 
      t.dueTime !== task.dueTime
    );
    localStorage.setItem('previousTasks', JSON.stringify(updatedTasks));

   
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedAllTasks = allTasks.filter(t => 
      t.title !== task.title || 
      t.dueDate !== task.dueDate || 
      t.dueTime !== task.dueTime
    );
    localStorage.setItem('tasks', JSON.stringify(updatedAllTasks));

    
    const deletionMessage = document.createElement('div');
    deletionMessage.className = "fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg";
    deletionMessage.textContent = "Task permanently deleted!";
    document.body.appendChild(deletionMessage);
    
    
    setTimeout(() => {
      document.body.removeChild(deletionMessage);
    }, 3000);

    
    if (updatedTasks.length === 0) {
      taskList.innerHTML = `
        <li class="text-center text-gray-500 py-4">
          No completed tasks yet. Complete some tasks to see them here!
        </li>
      `;
    }
  });

  li.appendChild(taskContent);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}


function formatTime(time) {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
}


window.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");
  if (!taskList) return;

 
  const previousTasks = JSON.parse(localStorage.getItem('previousTasks')) || [];
  
  if (previousTasks.length === 0) {
    taskList.innerHTML = `
      <li class="text-center text-gray-500 py-4">
        No completed tasks yet. Complete some tasks to see them here!
      </li>
    `;
  } else {
    
    previousTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate + ' ' + a.dueTime);
      const dateB = new Date(b.dueDate + ' ' + b.dueTime);
      return dateB - dateA;
    });
    
    previousTasks.forEach(task => renderPreviousTask(task));
  }
});
