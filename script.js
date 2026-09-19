const display = document.getElementById("display");

let currentInput = "";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

// Update the calculator display
function updateDisplay() {
    display.textContent = currentInput || "0";
}

// Enter numbers
function inputNumber(number) {
    if (waitingForSecondNumber) {
        currentInput = "";
        waitingForSecondNumber = false;
    }

    if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

// Enter decimal
function inputDecimal() {
    if (waitingForSecondNumber) {
        currentInput = "0";
        waitingForSecondNumber = false;
    }

    if (!currentInput.includes(".")) {
        currentInput += currentInput ? "." : "0.";
    }

    updateDisplay();
}

// Choose +, -, *, /
function chooseOperator(selectedOperator) {
    if (currentInput === "" && firstNumber === null) {
        return;
    }

    if (firstNumber !== null && currentInput !== "" && !waitingForSecondNumber) {
        calculate();
    }

    firstNumber = Number(currentInput);
    operator = selectedOperator;
    waitingForSecondNumber = true;
}

// Calculate the result
function calculate() {
    if (firstNumber === null || operator === null || currentInput === "") {
        return;
    }

    const secondNumber = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                currentInput = "Error";
                firstNumber = null;
                operator = null;
                waitingForSecondNumber = true;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    currentInput = String(Number(result.toFixed(10)));

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;

    updateDisplay();
}

// Clear everything
function clearDisplay() {
    currentInput = "";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;

    updateDisplay();
}

// Delete last number
function deleteLast() {
    if (waitingForSecondNumber || currentInput === "Error") {
        return;
    }

    currentInput = currentInput.slice(0, -1);

    updateDisplay();
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (key >= "0" && key <= "9") {
        inputNumber(key);
    }

    else if (key === ".") {
        inputDecimal();
    }

    else if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

    else if (key === "Backspace") {
        deleteLast();
    }
});