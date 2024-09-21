// Variables for task and sub-task management
var input = document.getElementById("input");
var button = document.getElementById("button");
var todolist = document.getElementById("todolist");
var tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Fetch tasks from local storage

// Trigger "Add" button when Enter is pressed
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        button.click();
    }
});

// Add new task
button.onclick = function() {
    var task = input.value.trim();

    if (task !== '') {
        tasks.push({ taskName: task, subTasks: [] }); // Add new task with sub-task array
        input.value = '';
        saveTasks();
        showList();
    }
};

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Display the task list
function showList() {
    todolist.innerHTML = '';

    tasks.forEach(function(taskObj, index) {
        var li = document.createElement('li');
        li.innerHTML = `<span>${taskObj.taskName}</span> 
                        <a class="edit" onclick="event.stopPropagation(); editTask(${index})">Edit</a> 
                        <a class="delete" onclick="event.stopPropagation(); deleteTask(${index})">Delete</a>
                        <button class="subtask-btn" onclick="event.stopPropagation(); goToSubTasks(${index})">Sub-tasks</button>`;
        todolist.appendChild(li);
    });
}

// Edit task
function editTask(index) {
    var newTask = prompt("Edit your task:", tasks[index].taskName);

    if (newTask !== null && newTask.trim() !== '') {
        tasks[index].taskName = newTask;
        saveTasks();
        showList();
    }
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    showList();
}

// Go to the sub-tasks page
function goToSubTasks(index) {
    localStorage.setItem('selectedTaskIndex', index); // Store the selected task index for sub-tasks
    window.location.href = 'subtasks.html';
}

// On loading tasks, show them
document.addEventListener("DOMContentLoaded", showList);

/* --- Sub-task functionality (in subtasks.html) --- */
if (window.location.pathname.includes('subtasks.html')) {
    var subtaskInput = document.getElementById('subtask-input');
    var subtaskButton = document.getElementById('subtask-button');
    var subtasklist = document.getElementById('subtasklist');
    var selectedTaskIndex = localStorage.getItem('selectedTaskIndex');
    var mainTaskTitle = document.getElementById('main-task-title');

    if (selectedTaskIndex !== null) {
        var currentTask = tasks[selectedTaskIndex];
        mainTaskTitle.innerText = currentTask.taskName; // Show main task name on subtask page
        showSubTasks(); // Display current sub-tasks
    }

    // Add new sub-task
    subtaskButton.onclick = function() {
        var subtask = subtaskInput.value.trim();
        if (subtask !== '') {
            currentTask.subTasks.push(subtask);
            subtaskInput.value = '';
            saveTasks();
            showSubTasks();
        }
    };

    // Display sub-task list
    function showSubTasks() {
        subtasklist.innerHTML = '';
        currentTask.subTasks.forEach(function(subTask, subIndex) {
            var subLi = document.createElement('li');
            subLi.innerHTML = `<span>${subTask}</span> 
                               <a class="edit" onclick="editSubTask(${subIndex})">Edit</a> 
                               <a class="delete" onclick="deleteSubTask(${subIndex})">Delete</a>`;
            subtasklist.appendChild(subLi);
        });
    }

    // Edit sub-task
    function editSubTask(subIndex) {
        var newSubTask = prompt("Edit your sub-task:", currentTask.subTasks[subIndex]);
        if (newSubTask !== null && newSubTask.trim() !== '') {
            currentTask.subTasks[subIndex] = newSubTask;
            saveTasks();
            showSubTasks();
        }
    }

    // Delete sub-task
    function deleteSubTask(subIndex) {
        currentTask.subTasks.splice(subIndex, 1);
        saveTasks();
        showSubTasks();
    }
}
