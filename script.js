let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

/* Selectors */

const lastOperationScreen = document.querySelector("#lastOperationScreen");
const currentOperationScreen = document.querySelector("#currentOperationScreen");
const clearButton = document.querySelector("#clearBtn");
const deleteButton = document.querySelector("#deleteBtn");
const numberButtons = document.querySelectorAll("[data-number");
const operatorButtons = document.querySelectorAll("[data-operator");
const pointButton = document.querySelector("#pointBtn");
const equalsButton = document.querySelector("#equalsBtn");

/* Buttons */

numberButtons.forEach((button) => {
    button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => setOperation(button.textContent));
});

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

/* Main */

function appendNumber(number) {
    if (currentOperationScreen.textContent === "0" || shouldResetScreen) {
        resetScreen();
    }
    currentOperationScreen.textContent += number;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = currentOperationScreen.textContent;
    currentOperation = operator;
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function clear() {
    currentOperationScreen.textContent = "0";
    lastOperationScreen.textContent = "";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent
        .toString()
        .slice(0, -1);
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (currentOperationScreen.textContent === "")
        currentOperationScreen.textContent = "0";
    if (currentOperationScreen.textContent.includes(".")) return;
    currentOperationScreen.textContent += ".";
}

function resetScreen() {
    currentOperationScreen.textContent = "";
    shouldResetScreen = false;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

/* Basic Math Functions */

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            if (b === 0) return null;
            else return divide(a, b);
        default:
            return null;
    }
}