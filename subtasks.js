// Get elements from the DOM
var subtaskInput = document.getElementById('subtask-input'); // Input field for new sub-task
var subtaskButton = document.getElementById('subtask-button'); // Button to add new sub-task
var subtaskList = document.getElementById('subtasklist'); // List to display sub-tasks

// Retrieve the current task index from localStorage
var selectedTaskIndex = localStorage.getItem('selectedTaskIndex');
var tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Fetch tasks from localStorage

// Check if the selected task index is valid
if (selectedTaskIndex !== null) {
    var currentTask = tasks[selectedTaskIndex]; // Get the current task
    document.getElementById('main-task-title').innerText = currentTask.taskName; // Display the main task name
    showSubTasks(); // Display current sub-tasks
} else {
    console.error('No task selected.'); // Log error if no task is selected
}

// Add Enter key functionality for sub-task input
subtaskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        subtaskButton.click(); // Trigger the Add button when Enter is pressed
    }
});

// Add new sub-task
subtaskButton.onclick = function() {
    var subtask = subtaskInput.value.trim(); // Get and trim the input value

    if (subtask !== '') { // Ensure the input is not empty
        currentTask.subTasks.push(subtask); // Add new sub-task to the current task
        subtaskInput.value = ''; // Clear input field
        saveTasks(); // Save updated tasks to localStorage
        showSubTasks(); // Refresh the sub-task list
    }
};

// Display the sub-task list
function showSubTasks() {
    subtaskList.innerHTML = ''; // Clear existing sub-task list

    currentTask.subTasks.forEach(function(subTask, subIndex) {
        var subLi = document.createElement('li'); // Create a new list item for each sub-task
        subLi.innerHTML = `<span>${subTask}</span>
                           <a class="edit" onclick="editSubTask(${subIndex})">Edit</a>
                           <a class="delete" onclick="deleteSubTask(${subIndex})">Delete</a>`;
        subtaskList.appendChild(subLi); // Append the new item to the sub-task list

        // Make the list item focusable and add event listener for Delete key
        subLi.tabIndex = 0; // Allow the list item to be focused
        subLi.addEventListener('keydown', function(event) {
            if (event.key === 'Delete') {
                deleteSubTask(subIndex); // Trigger delete on Delete key press
            }
        });
    });
}

// Edit a sub-task
function editSubTask(subIndex) {
    var newSubTask = prompt("Edit your sub-task:", currentTask.subTasks[subIndex]); // Prompt for new sub-task name

    if (newSubTask !== null && newSubTask.trim() !== '') { // Ensure the input is not empty
        currentTask.subTasks[subIndex] = newSubTask; // Update the sub-task
        saveTasks(); // Save updated tasks to localStorage
        showSubTasks(); // Refresh the sub-task list
    }
}

// Delete a sub-task
function deleteSubTask(subIndex) {
    currentTask.subTasks.splice(subIndex, 1); // Remove the specified sub-task
    saveTasks(); // Save updated tasks to localStorage
    showSubTasks(); // Refresh the sub-task list
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert tasks to JSON and save
}

// Initialize by displaying the sub-tasks
showSubTasks();
