const taskBoard = document.getElementById('taskBoard');
const addTaskBox = document.getElementById('addTaskBox');
const taskModal = document.getElementById('taskModal');
const closeButton = document.querySelector('.close-button');
const saveTaskButton = document.getElementById('saveTaskButton');
const taskTitleInput = document.getElementById('taskTitleInput');
const taskItemTextarea = document.getElementById('taskItemTextarea');

// Open the modal when the add task box is clicked
addTaskBox.addEventListener('click', function () {
    taskModal.style.display = 'flex';
});

// Close the modal when the close button is clicked
closeButton.addEventListener('click', function () {
    taskModal.style.display = 'none';
    clearModalInputs();
});

// Save task and close the modal
saveTaskButton.addEventListener('click', function () {
    const title = taskTitleInput.value.trim();
    const todoText = taskItemTextarea.value.trim();
    if (title === '' || todoText === '') {
        alert("Please enter both a title and at least one to-do item.");
        return;
    }

    // Create the task box container
    const taskBox = document.createElement('div');
    taskBox.classList.add('task-box');

    // Assign random background colors for different task boxes
    const colors = ['yellow', 'blue', 'pink', 'orange'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    taskBox.classList.add(randomColor); // Add a random background color

    // Create and append the title
    const taskTitle = document.createElement('h2');
    taskTitle.textContent = title;
    taskBox.appendChild(taskTitle);

    // Create a container for to-do items
    const taskList = document.createElement('div');
    const todos = todoText.split('\n');
    todos.forEach(todo => {
        if (todo.trim() !== '') {
            const taskItem = document.createElement('div');
            taskItem.textContent = todo;
            taskItem.style.marginBottom = '5px';
            taskItem.style.color = '#ABB7A7';
            taskItem.style.lineHeight = '1.5';
            taskList.appendChild(taskItem);
        }
    });
    taskBox.appendChild(taskList);

    // Create and append the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Task';
    deleteButton.classList.add('delete-button');
    taskBox.appendChild(deleteButton);

    // Event listener to delete the task
    deleteButton.addEventListener('click', function () {
        taskBoard.removeChild(taskBox); // Remove from DOM
        removeTaskFromLocalStorage(title); // Remove from localStorage
    });

    // Append the task box to the task board
    taskBoard.insertBefore(taskBox, addTaskBox);

    // Save task to localStorage with color
    saveTaskToLocalStorage(title, todos, randomColor);

    // Close the modal and clear inputs
    taskModal.style.display = 'none';
    clearModalInputs();
});

// Function to clear modal inputs
function clearModalInputs() {
    taskTitleInput.value = '';
    taskItemTextarea.value = '';
}

// Load tasks from localStorage when the page loads
window.addEventListener('load', loadTasksFromLocalStorage);

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const { title, todos, color } = task; // Load color from localStorage

        const taskBox = document.createElement('div');
        taskBox.classList.add('task-box');

        // Apply the saved background color to the task box
        taskBox.classList.add(color);

        const taskTitle = document.createElement('h2');
        taskTitle.textContent = title;
        taskBox.appendChild(taskTitle);

        const taskList = document.createElement('div');
        todos.forEach(todo => {
            const taskItem = document.createElement('div');
            taskItem.textContent = todo;
            taskItem.style.marginBottom = '5px';
            taskItem.style.color = '#ABB7A7';
            taskItem.style.lineHeight = '1.5';
            taskList.appendChild(taskItem);
        });
        taskBox.appendChild(taskList);

        // Create and append the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Task';
        deleteButton.classList.add('delete-button');
        taskBox.appendChild(deleteButton);

        // Event listener to delete the task
        deleteButton.addEventListener('click', function () {
            taskBoard.removeChild(taskBox); // Remove from DOM
            removeTaskFromLocalStorage(title); // Remove from localStorage
        });

        // Append the task box to the task board
        taskBoard.insertBefore(taskBox, addTaskBox);
    });
}

// Function to save the current task to localStorage, including color
function saveTaskToLocalStorage(title, todos, color) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title, todos, color }); // Save color with task
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from localStorage
function removeTaskFromLocalStorage(title) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.title !== title); // Filter out the deleted task
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated tasks back to localStorage
}
