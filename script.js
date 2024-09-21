
var input = document.getElementById("input");
var button = document.getElementById("button");
var todolist = document.getElementById("todolist");

var tasks = [];

button.onclick = function() {
  var task = input.value.trim();

  if (task !== '') {
    tasks.push(task); 
    input.value = ''; 
    showList(); 
  }
};


function showList() {
  todolist.innerHTML = ''; 

  // Loop through the tasks and create list items
  tasks.forEach(function(task, index) {
    // Create the task item as HTML with edit and delete options
    todolist.innerHTML += `<li>${task} 
      <a onclick="editTask(${index})">Edit</a> 
      <a onclick="deleteTask(${index})">Delete</a>
    </li>`;
  });
}

// Function to delete a task based on its index
function deleteTask(index) {
  tasks.splice(index, 1); // Remove the task from the array
  showList(); // Update the list
}

// Function to edit a task based on its index
function editTask(index) {
  var newTask = prompt("Edit your task:", tasks[index]); // Get the new task name

  // Update the task if the input is not empty
  if (newTask !== null && newTask.trim() !== '') {
    tasks[index] = newTask; // Replace the old task with the new one
    showList(); // Update the list
  }
}
