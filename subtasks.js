 // Variables for sub-task management
 var subtaskInput = document.getElementById('subtask-input');
 var subtaskButton = document.getElementById('subtask-button');
 var subtasklist = document.getElementById('subtasklist');
 var selectedTaskIndex = localStorage.getItem('selectedTaskIndex');
 var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
 var currentTask;

 // Check if a task is selected
 if (selectedTaskIndex !== null) {
     currentTask = tasks[selectedTaskIndex];
     document.getElementById('main-task-title').innerText = currentTask.taskName; // Show main task name
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
     subtasklist.innerHTML = ''; // Clear existing list
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

 // Save tasks to local storage
 function saveTasks() {
     tasks[selectedTaskIndex].subTasks = currentTask.subTasks; // Update sub-tasks
     localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks to localStorage
 }