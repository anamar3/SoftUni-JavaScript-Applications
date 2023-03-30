// Get the input and button elements from the DOM
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');

// Get the todo list element from the DOM
const todoList = document.getElementById('todoList');

// Define an array to store the todos
let todos = [];

// Function to render the todos in the DOM
function renderTodos() {
	// Clear the current list of todos
	todoList.innerHTML = '';

	// Loop through the todos and add them to the list
	for (let i = 0; i < todos.length; i++) {
		const todo = todos[i];
		const li = document.createElement('li');
		li.innerText = todo;
		todoList.appendChild(li);
	}
}

// Function to add a new todo to the array and render the todos
function addTodo() {
	// Get the value of the input
	const newTodo = todoInput.value;

	// Add the new todo to the array
	todos.push(newTodo);

	// Clear the input
	todoInput.value = '';

	// Render the todos in the DOM
	renderTodos();
}

// Add a click event listener to the button to add a new todo
addButton.addEventListener('click', addTodo);