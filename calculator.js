// Get the input and button elements from the DOM
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const addButton = document.getElementById('addButton');
const subButton = document.getElementById('subButton');
const mulButton = document.getElementById('mulButton');
const divButton = document.getElementById('divButton');
const resultInput = document.getElementById('result');

// Function to add two numbers
function add() {
	// Get the values of the input fields
	const num1 = Number(num1Input.value);
	const num2 = Number(num2Input.value);

	// Add the two numbers and display the result
	resultInput.value = num1 + num2;
}

// Function to subtract two numbers
function subtract() {
	// Get the values of the input fields
	const num1 = Number(num1Input.value);
	const num2 = Number(num2Input.value);

	// Subtract the two numbers and display the result
	resultInput.value = num1 - num2;
}

// Function to multiply two numbers
function multiply() {
	// Get the values of the input fields
	const num1 = Number(num1Input.value);
	const num2 = Number(num2Input.value);

	// Multiply the two numbers and display the result
	resultInput.value = num1 * num2;
}

// Function to divide two numbers
function divide() {
	// Get the values of the input fields
	const num1 = Number(num1Input.value);
	const num2 = Number(num2Input.value);

	// Divide the two numbers and display the result
	resultInput.value = num1 / num2;
}

// Add click event listeners to the buttons to perform the operations
addButton.addEventListener('click', add);
subButton.addEventListener('click', subtract);
mulButton.addEventListener('click', multiply);
divButton.addEventListener('click', divide);