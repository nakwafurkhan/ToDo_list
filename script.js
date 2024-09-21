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
        li.innerHTML = `
            <div class="task-content">
                <span>${taskObj.taskName}</span>
                <div class="button-container">
                    <button class="edit" onclick="event.stopPropagation(); editTask(${index})">Edit</button>
                    <button class="delete" onclick="event.stopPropagation(); deleteTask(${index})">Delete</button>
                    <button class="subtask-btn" onclick="event.stopPropagation(); goToSubTasks(${index})">Sub-tasks</button>
                </div>
            </div>`;
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
