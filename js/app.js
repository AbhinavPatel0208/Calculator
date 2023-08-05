// let string = "";
// let buttons = document.querySelectorAll(".button");
// Array.from(buttons).forEach((button) => {
//   button.addEventListener("click", (e) => {
//     if (e.target.innerHTML == "=") {
//       string = eval(string);
//       document.querySelector("input").value = string;
//     }
//     else if (e.target.innerHTML == "C") {
//       string = "";
//       document.querySelector("input").value = string;
//     }
//     else {
//       console.log(e.target);
//       string = string + e.target.innerHTML;
//       document.querySelector("input").value = string;
//     }
//   });
// });

// Initialize the input string
let string = "";

// Get all the buttons in the calculator
let buttons = document.querySelectorAll(".button");

// Get the input field where the calculations are displayed
const inputField = document.querySelector("input");

// Add event listeners to each button
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    try {
      // Evaluate the input when the "=" button is clicked
      if (e.target.innerHTML === "=") {
        string = eval(string); // Evaluate the mathematical expression
        if (Number.isFinite(string)) {
          // Limiting result to 4 decimal places
          string = parseFloat(string.toFixed(4));
        } else {
          string = "Error"; // Display "Error" if the result is not a valid number
        }
        inputField.value = string; // Update the input field with the result
      } else if (e.target.innerHTML === "C") {
        // Clear the input when the "C" button is clicked
        string = "";
        inputField.value = string;
      } else if (e.target.innerHTML === "Delete") {
        // Remove the last character when the "Delete" button is clicked
        string = string.slice(0, -1);
        inputField.value = string;
      } else if (e.target.innerHTML === ".") {
        // Allow decimal numbers
        if (!string.includes(".")) {
          string += ".";
          inputField.value = string;
        }
      } else {
        // For other buttons (digits/operators), append the value to the input string
        string += e.target.innerHTML;
        inputField.value = string;
      }
    } catch (error) {
      // Handle any errors that occur during evaluation
      string = "Error";
      inputField.value = string;
    }
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // Handling numbers, operators, and decimal point
  if (/[0-9+\-*/.=]|Delete/.test(key)) {
    e.preventDefault();
    const keyButton = document.querySelector(`.button[data-key="${key}"]`);
    if (keyButton) {
      keyButton.click(); // Simulate a click on the corresponding button
    }
  }

  // Handling "C" key for clearing
  if (key === "c" || key === "C") {
    e.preventDefault();
    const clearButton = document.querySelector(".button[data-key='C']");
    if (clearButton) {
      clearButton.click(); // Simulate a click on the "C" button
    }
  }

  // Handling "Enter" key for equals
  if (key === "Enter") {
    e.preventDefault();
    const equalsButton = document.querySelector(".button[data-key='=']");
    if (equalsButton) {
      equalsButton.click(); // Simulate a click on the "=" button
    }
  }
});
