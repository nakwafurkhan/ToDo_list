// subtask.js
var subtaskInput = document.getElementById("subtask-input");
var subtaskButton = document.getElementById("subtask-button");
var subtaskList = document.getElementById("subtasklist");
var taskIndex = localStorage.getItem('selectedTaskIndex'); // Get the selected task index
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Trigger "Add" button when Enter is pressed
subtaskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        subtaskButton.click();
    }
});

// Add new sub-task
subtaskButton.onclick = function() {
    var subtask = subtaskInput.value.trim();

    if (subtask !== '') {
        tasks[taskIndex].subTasks.push(subtask); // Add new sub-task to the corresponding task
        subtaskInput.value = '';
        saveTasks();
        showSubTaskList();
    }
};

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Display the sub-task list
function showSubTaskList() {
    subtaskList.innerHTML = '';

    tasks[taskIndex].subTasks.forEach(function(subtask, index) {
        var li = document.createElement('li');
        li.innerHTML = `
            <div class="task-content">
                <span>${subtask}</span>
                <div class="button-container">
                    <button class="edit" onclick="event.stopPropagation(); editSubTask(${index})">Edit</button>
                    <button class="delete" onclick="event.stopPropagation(); deleteSubTask(${index})">Delete</button>
                </div>
            </div>`;
        subtaskList.appendChild(li);
    });
}

// Edit sub-task
function editSubTask(index) {
    var newSubTask = prompt("Edit your sub-task:", tasks[taskIndex].subTasks[index]);

    if (newSubTask !== null && newSubTask.trim() !== '') {
        tasks[taskIndex].subTasks[index] = newSubTask;
        saveTasks();
        showSubTaskList();
    }
}

// Delete sub-task
function deleteSubTask(index) {
    tasks[taskIndex].subTasks.splice(index, 1);
    saveTasks();
    showSubTaskList();
}

// Go back to tasks page
function goBack() {
    window.location.href = 'index.html'; // Change this to your tasks page URL
}

// On loading sub-tasks, show them
document.addEventListener("DOMContentLoaded", showSubTaskList);
