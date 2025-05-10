const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const adsList = document.getElementById("adsList");

const todayBtn = document.getElementById("todayBtn");
const tomorrowBtn = document.getElementById("tomorrowBtn");
const customDateInput = document.getElementById("customDate");
const taskTimeInput = document.getElementById("taskTime");
const timePeriodInput = document.getElementById("timePeriod");


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
    },
    {
      title: "Khan Academy - Free Learning",
      url: "https://www.khanacademy.org/",
      description: "Free educational resources for all ages"
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
    },
    {
      title: "Fitbit - Health & Fitness",
      url: "https://www.fitbit.com/",
      description: "Track your activity, sleep, and more"
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
    },
    {
      title: "Trello - Project Management",
      url: "https://trello.com/",
      description: "Visual project management tool"
    }
  ],
  finance: [
    {
      title: "Mint - Budget Tracker",
      url: "https://www.mint.com/",
      description: "Track your spending and manage your budget"
    },
    {
      title: "Robinhood - Investing",
      url: "https://robinhood.com/",
      description: "Start investing with as little as $1"
    },
    {
      title: "YNAB - Budgeting",
      url: "https://www.ynab.com/",
      description: "Give every dollar a job with this budgeting app"
    }
  ],
  travel: [
    {
      title: "Airbnb - Unique Stays",
      url: "https://www.airbnb.com/",
      description: "Find unique places to stay around the world"
    },
    {
      title: "Skyscanner - Flight Deals",
      url: "https://www.skyscanner.com/",
      description: "Find the best flight deals and travel options"
    },
    {
      title: "TripAdvisor - Travel Planning",
      url: "https://www.tripadvisor.com/",
      description: "Plan your perfect trip with reviews and tips"
    }
  ],
  food: [
    {
      title: "HelloFresh - Meal Kits",
      url: "https://www.hellofresh.com/",
      description: "Get fresh ingredients and easy recipes delivered"
    },
    {
      title: "Yelp - Restaurant Finder",
      url: "https://www.yelp.com/",
      description: "Find the best local restaurants and reviews"
    },
    {
      title: "AllRecipes - Cooking",
      url: "https://www.allrecipes.com/",
      description: "Discover recipes, cooking tips, and more"
    }
  ],
  shopping: [
    {
      title: "Amazon - Online Shopping",
      url: "https://www.amazon.com/",
      description: "Shop millions of products with fast delivery"
    },
    {
      title: "Etsy - Handmade Goods",
      url: "https://www.etsy.com/",
      description: "Find unique handmade and vintage items"
    },
    {
      title: "eBay - Online Marketplace",
      url: "https://www.ebay.com/",
      description: "Buy and sell items in the world's online marketplace"
    }
  ],
  entertainment: [
    {
      title: "Netflix - Streaming",
      url: "https://www.netflix.com/",
      description: "Watch movies and TV shows online"
    },
    {
      title: "Spotify - Music",
      url: "https://www.spotify.com/",
      description: "Stream millions of songs and podcasts"
    },
    {
      title: "Audible - Audiobooks",
      url: "https://www.audible.com/",
      description: "Listen to best-selling audiobooks"
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
    },
    {
      title: "Dropbox - Cloud Storage",
      url: "https://www.dropbox.com/",
      description: "Store and share your files securely"
    }
  ]
};


function displayAds(title, tags) {
  const adsList = document.getElementById('adsList');
  if (!adsList) return;

 
  adsList.innerHTML = '';

  
  const searchText = (title + ' ' + tags).toLowerCase();
  let selectedAds = taskAds.default;

  
  if (searchText.includes('study') || searchText.includes('learn') || searchText.includes('course') || 
      searchText.includes('school') || searchText.includes('university') || searchText.includes('exam')) {
    selectedAds = taskAds.study;
  } else if (searchText.includes('gym') || searchText.includes('fitness') || searchText.includes('health') || 
             searchText.includes('workout') || searchText.includes('exercise') || searchText.includes('diet')) {
    selectedAds = taskAds.health;
  } else if (searchText.includes('work') || searchText.includes('task') || searchText.includes('project') || 
             searchText.includes('meeting') || searchText.includes('deadline') || searchText.includes('office')) {
    selectedAds = taskAds.work;
  } else if (searchText.includes('money') || searchText.includes('finance') || searchText.includes('budget') || 
             searchText.includes('invest') || searchText.includes('save') || searchText.includes('bank')) {
    selectedAds = taskAds.finance;
  } else if (searchText.includes('travel') || searchText.includes('trip') || searchText.includes('vacation') || 
             searchText.includes('flight') || searchText.includes('hotel') || searchText.includes('tour')) {
    selectedAds = taskAds.travel;
  } else if (searchText.includes('food') || searchText.includes('cook') || searchText.includes('recipe') || 
             searchText.includes('meal') || searchText.includes('restaurant') || searchText.includes('dinner')) {
    selectedAds = taskAds.food;
  } else if (searchText.includes('shop') || searchText.includes('buy') || searchText.includes('purchase') || 
             searchText.includes('store') || searchText.includes('market') || searchText.includes('retail')) {
    selectedAds = taskAds.shopping;
  } else if (searchText.includes('movie') || searchText.includes('music') || searchText.includes('game') || 
             searchText.includes('entertainment') || searchText.includes('watch') || searchText.includes('play')) {
    selectedAds = taskAds.entertainment;
  }

  
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
  displayAds(title, tags); 
  taskForm.reset();
  customDateInput.valueAsDate = today;
});


function formatTime(time) {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
}


function handleTaskCompletion(task, li) {
  task.status = task.status === "incomplete" ? "completed" : "incomplete";
  
  
  const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  
  const taskIndex = allTasks.findIndex(t => 
    t.title === task.title && 
    t.dueDate === task.dueDate && 
    t.dueTime === task.dueTime
  );
  
  if (taskIndex !== -1) {
    allTasks[taskIndex] = task;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  }

  
  if (task.status === "completed") {
    
    taskList.removeChild(li);
    
    
    const previousTasks = JSON.parse(localStorage.getItem('previousTasks')) || [];
    previousTasks.push(task);
    localStorage.setItem('previousTasks', JSON.stringify(previousTasks));
    
   
    const updatedTasks = allTasks.filter(t => 
      t.title !== task.title || 
      t.dueDate !== task.dueDate || 
      t.dueTime !== task.dueTime
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    
    const completionMessage = document.createElement('div');
    completionMessage.className = "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg";
    completionMessage.textContent = "Task moved to Previous Tasks!";
    document.body.appendChild(completionMessage);
    
    
    setTimeout(() => {
      document.body.removeChild(completionMessage);
    }, 3000);
  } else {
    
    taskList.removeChild(li);
    renderTask(task);
  }
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
    
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = allTasks.filter(t => 
      t.title !== task.title || 
      t.dueDate !== task.dueDate || 
      t.dueTime !== task.dueTime
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  });

  li.appendChild(taskContent);
  li.appendChild(deleteBtn);

  const toggleBtn = taskContent.querySelector(".toggleBtn");
  toggleBtn.addEventListener("click", () => {
    handleTaskCompletion(task, li);
  });

  taskList.appendChild(li);
}


window.addEventListener("DOMContentLoaded", () => {
  
  const adsList = document.getElementById('adsList');
  if (adsList) {
    adsList.innerHTML = '';
  }
  
  
  const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const incompleteTasks = allTasks.filter(task => task.status === "incomplete");
  
  
  localStorage.setItem('tasks', JSON.stringify(incompleteTasks));
  
  
  if (incompleteTasks.length === 0) {
    taskList.innerHTML = `
      <li class="text-center text-gray-500 py-4">
        No tasks yet. Add a new task to get started!
      </li>
    `;
  } else {
    incompleteTasks.forEach(task => renderTask(task));
  }
  
  
  displayAds('', '');
});
