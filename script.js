
// ==============================
// Select Elements
// ==============================

const currentOperand =
    document.querySelector("#currentOperand");

const previousOperand =
    document.querySelector("#previousOperand");

const numberButtons =
    document.querySelectorAll("[data-number]");

const operatorButtons =
    document.querySelectorAll("[data-operator]");

const actionButtons =
    document.querySelectorAll("[data-action]");


// ==============================
// Variables
// ==============================

let currentNumber = "";

let previousNumber = "";

let operator = "";


// ==============================
// Update Display
// ==============================

function updateDisplay() {

    currentOperand.textContent =
        currentNumber || "0";

    previousOperand.textContent =
        previousNumber && operator
            ? `${previousNumber} ${getOperatorSymbol(operator)}`
            : "";
}


// ==============================
// Operator Symbol
// ==============================

function getOperatorSymbol(operator) {

    if (operator === "*") {
        return "×";
    }

    if (operator === "/") {
        return "÷";
    }

    if (operator === "-") {
        return "−";
    }

    return operator;
}


// ==============================
// Add Number
// ==============================

function addNumber(number) {

    // Decimal check
    if (number === "." &&
        currentNumber.includes(".")) {

        return;
    }


    // Don't allow multiple zeros at start
    if (
        currentNumber === "0" &&
        number !== "."
    ) {

        currentNumber = number;

    } else {

        currentNumber += number;
    }


    updateDisplay();
}


// ==============================
// Choose Operator
// ==============================

function chooseOperator(selectedOperator) {

    if (currentNumber === "") {
        return;
    }


    // Calculate previous operation first
    if (previousNumber !== "") {

        calculate();
    }


    operator = selectedOperator;

    previousNumber = currentNumber;

    currentNumber = "";


    updateDisplay();
}


// ==============================
// Calculate
// ==============================

function calculate() {

    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operator === ""
    ) {

        return;
    }


    const firstNumber =
        parseFloat(previousNumber);

    const secondNumber =
        parseFloat(currentNumber);

    let result;


    switch (operator) {

        case "+":

            result =
                firstNumber + secondNumber;

            break;


        case "-":

            result =
                firstNumber - secondNumber;

            break;


        case "*":

            result =
                firstNumber * secondNumber;

            break;


        case "/":

            if (secondNumber === 0) {

                currentNumber = "Error";

                previousNumber = "";

                operator = "";

                updateDisplay();

                return;
            }

            result =
                firstNumber / secondNumber;

            break;
    }


    // Remove unnecessary decimal
    result =
        Number(result.toFixed(10));


    currentNumber =
        result.toString();

    previousNumber = "";

    operator = "";


    updateDisplay();
}


// ==============================
// Clear Calculator
// ==============================

function clearCalculator() {

    currentNumber = "";

    previousNumber = "";

    operator = "";


    updateDisplay();
}


// ==============================
// Delete Last Number
// ==============================

function deleteNumber() {

    currentNumber =
        currentNumber.slice(0, -1);


    updateDisplay();
}


// ==============================
// Percentage
// ==============================

function percentage() {

    if (currentNumber === "") {
        return;
    }


    currentNumber =
        (parseFloat(currentNumber) / 100)
        .toString();


    updateDisplay();
}


// ==============================
// Number Button Events
// ==============================

numberButtons.forEach((button) => {

    button.addEventListener("click", () => {

        addNumber(
            button.dataset.number
        );

    });

});


// ==============================
// Operator Button Events
// ==============================

operatorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        chooseOperator(
            button.dataset.operator
        );

    });

});


// ==============================
// Action Buttons
// ==============================

actionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const action =
            button.dataset.action;


        if (action === "clear") {

            clearCalculator();

        }


        else if (action === "delete") {

            deleteNumber();

        }


        else if (action === "percent") {

            percentage();

        }


        else if (action === "calculate") {

            calculate();

        }

    });

});


// ==============================
// Keyboard Support
// ==============================

document.addEventListener("keydown", (event) => {

    const key = event.key;


    // Numbers
    if (
        !isNaN(key) ||
        key === "."
    ) {

        addNumber(key);

    }


    // Operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        chooseOperator(key);

    }


    // Enter / =
    else if (
        key === "Enter" ||
        key === "="
    ) {

        calculate();

    }


    // Backspace
    else if (key === "Backspace") {

        deleteNumber();

    }


    // Escape
    else if (key === "Escape") {

        clearCalculator();

    }


    // Percentage
    else if (key === "%") {

        percentage();

    }

});

