const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const adsList = document.getElementById("adsList");

const todayBtn = document.getElementById("todayBtn");
const tomorrowBtn = document.getElementById("tomorrowBtn");
const customDateInput = document.getElementById("customDate");
const taskTimeInput = document.getElementById("taskTime");
const timePeriodInput = document.getElementById("timePeriod");

// Set today's date as default
const today = new Date();
customDateInput.valueAsDate = today;

todayBtn.addEventListener("click", () => {
  customDateInput.valueAsDate = new Date();
});
tomorrowBtn.addEventListener("click", () => {
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  customDateInput.valueAsDate = tomorrow;
});

// Direct ad data
const taskAds = {
  study: [
    {
      title: "Coursera - Online Courses",
      url: "https://www.coursera.org/",
      description: "Access thousands of courses from top universities"
    },
    {
      title: "Udemy - Learn Anything",
      url: "https://www.udemy.com/",
      description: "Expert-led video courses for any skill"
    }
  ],
  health: [
    {
      title: "MyFitnessPal - Health Tracker",
      url: "https://www.myfitnesspal.com/",
      description: "Track your fitness and nutrition goals"
    },
    {
      title: "Headspace - Meditation",
      url: "https://www.headspace.com/",
      description: "Meditation and mindfulness made simple"
    }
  ],
  work: [
    {
      title: "Notion - All-in-one Workspace",
      url: "https://www.notion.so/",
      description: "Write, plan, and get organized"
    },
    {
      title: "Todoist - Task Manager",
      url: "https://todoist.com/",
      description: "Organize your tasks and boost productivity"
    }
  ],
  default: [
    {
      title: "Google Workspace",
      url: "https://workspace.google.com/",
      description: "Everything you need to get anything done"
    },
    {
      title: "Microsoft 365",
      url: "https://www.microsoft.com/microsoft-365",
      description: "Office apps and cloud services"
    }
  ]
};

// Function to display ads
function displayAds(title, tags) {
  const adsList = document.getElementById('adsList');
  if (!adsList) return;

  // Clear previous ads
  adsList.innerHTML = '';

  // Determine which category of ads to show
  const searchText = (title + ' ' + tags).toLowerCase();
  let selectedAds = taskAds.default;

  if (searchText.includes('study') || searchText.includes('learn') || searchText.includes('course')) {
    selectedAds = taskAds.study;
  } else if (searchText.includes('gym') || searchText.includes('fitness') || searchText.includes('health')) {
    selectedAds = taskAds.health;
  } else if (searchText.includes('work') || searchText.includes('task') || searchText.includes('project')) {
    selectedAds = taskAds.work;
  }

  // Display the selected ads
  selectedAds.forEach(ad => {
    const adElement = document.createElement('div');
    adElement.className = "p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow";
    
    adElement.innerHTML = `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">${ad.title}</h3>
      <p class="text-gray-600 mb-3">${ad.description}</p>
      <a href="${ad.url}" target="_blank" rel="noopener noreferrer" 
         class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Learn More
      </a>
    `;
    
    adsList.appendChild(adElement);
  });
}

// Function to handle task form submission
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();
  const tags = document.getElementById("taskTags").value.trim();
  const dueDate = document.getElementById("customDate").value;
  const timeInput = document.getElementById("taskTime").value;
  const timePeriod = document.getElementById("timePeriod").value;
  const priority = document.getElementById("priority").value;

  if (!title) return;

  // Convert time to 24-hour format
  let dueTime = timeInput;
  if (timeInput) {
    const [hours, minutes] = timeInput.split(':');
    let hour = parseInt(hours);
    if (timePeriod === 'PM' && hour !== 12) {
      hour += 12;
    } else if (timePeriod === 'AM' && hour === 12) {
      hour = 0;
    }
    dueTime = `${hour.toString().padStart(2, '0')}:${minutes}`;
  }

  const task = {
    title,
    description,
    tags,
    dueDate,
    dueTime,
    priority,
    status: "incomplete",
  };

  const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  allTasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(allTasks));

  renderTask(task);
  displayAds(title, tags); // Display relevant ads
  taskForm.reset();
  customDateInput.valueAsDate = today;
});

// Format time to include AM/PM
function formatTime(time) {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
}

function renderTask(task) {
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
    <h3 class="text-lg font-bold ${task.status === "incomplete" ? "text-red-600" : "text-green-600"}">${task.title}</h3>
    ${task.description ? `<p>${task.description}</p>` : ""}
    ${task.tags ? `<p class="text-xs text-gray-500">Tags: ${task.tags}</p>` : ""}
    <p class="text-xs text-gray-500">Due: ${task.dueDate} ${formatTime(task.dueTime)}</p>
    <span class="inline-block px-2 py-1 mt-1 text-xs font-semibold text-white rounded ${
      task.priority === "high"
        ? "bg-red-500"
        : task.priority === "medium"
        ? "bg-yellow-500"
        : "bg-green-500"
    }">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
    <div class="mt-2">
      <button class="text-sm text-blue-600 hover:underline toggleBtn">Mark as ${
        task.status === "incomplete" ? "Completed" : "Incomplete"
      }</button>
    </div>
  `;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.className = "text-red-500 hover:text-red-700 ml-4";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });

  li.appendChild(taskContent);
  li.appendChild(deleteBtn);

  const toggleBtn = taskContent.querySelector(".toggleBtn");
  toggleBtn.addEventListener("click", () => {
    task.status = task.status === "incomplete" ? "completed" : "incomplete";
    taskList.removeChild(li);
    renderTask(task);
  });

  taskList.appendChild(li);
}

// Update the page load handler
window.addEventListener("DOMContentLoaded", () => {
  // Clear any existing ads
  const adsList = document.getElementById('adsList');
  if (adsList) {
    adsList.innerHTML = '';
  }
  
  // Load existing tasks from localStorage
  const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  allTasks.forEach(task => renderTask(task));
  
  // Display default ads
  displayAds('', '');
});
