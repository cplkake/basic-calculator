// default value displayed on calculator
const default_feedback_display_value = '0';

// variable declaration for text values of display 
let entry_display_value = '';
let feedback_display_value = default_feedback_display_value;

// variable declaration for DOM objects
let entry_display;
let feedback_display;

// variable declaration for values to be used for operate() and its result
let first_number;
let operation;
let second_number;

// DOM objects for buttons-container and number buttons
const buttonsContainer = document.getElementById('buttons-container');
const numButtons = buttonsContainer.querySelectorAll(".numerical-button");

// variable declaration for button clicked
let numButtonClicked;
let opButtonClicked;
let modButtonClicked;

// flag that updates to true once the decimal button has been clicked
let decimalClicked = false;

function divide (num1, num2) {
    return num1 / num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function add (num1, num2) {
    return num1 + num2;
}

function operate(operation, num1, num2) {
    return operation(num1, num2);
}


function updateFeedbackDisplay(value) {
    feedback_display = document.getElementById("feedback-display");
    feedback_display.innerText = value;
}

function numEntryCheck(numButtonClicked) {
    if (feedback_display_value === default_feedback_display_value && numButtonClicked === '0') {
        return;
    } else if (decimalClicked && numButtonClicked === '.'){
        return;
    } else {
        if (numButtonClicked === '.') {
            decimalClicked = true;
            if (feedback_display_value === default_feedback_display_value) {
                numButtonClicked = '0' + numButtonClicked;
            }
        }

        if (feedback_display_value == default_feedback_display_value) {
            feedback_display_value = numButtonClicked;
            updateFeedbackDisplay(feedback_display_value);
        } else {
            feedback_display_value += numButtonClicked;
            updateFeedbackDisplay(feedback_display_value);
        }
    }
}

function addNumericalButtonListeners() {
    numButtons.forEach((numButton) => {
        numButton.addEventListener('mousedown', (e) => {
            numButton.classList.add('numerical-button-clicked');
        });    
        numButton.addEventListener('mouseout', () => {
            numButton.classList.remove('numerical-button-clicked');
        });
        numButton.addEventListener('click', () => {
            numButton.classList.remove('numerical-button-clicked');
            numButtonClicked = numButton.innerText;
            numEntryCheck(numButtonClicked);
        });    
    });
}

function setFirstNumber() {
    first_number = Number(feedback_display_value);
}

function setOperation(operator) {
    // sets the value of global variable operation
    if (operator === 'divide') {
        operation = divide;
    } else if (operator === 'multiply') {
        operation = multiply;
    } else if (operator === 'subtract') {
        operation = subtract;
    } else if (operator === 'add') {
        operation = add;
    }
}

function updateEntryDisplay(new_entry) {
    entry_display_value = `${entry_display_value} ${new_entry}`;
    entry_display = document.getElementById("entry-display");
    entry_display.innerText = entry_display_value;
}

function resetFeedbackDisplay() {
    feedback_display_value = '';
}

function resetEntryDisplay() {
    entry_display_value = '';
}

function setSecondNumber() {
    second_number = Number(feedback_display_value);
}

function resetFirstAndSecondNumbers() {
    first_number = undefined;
    second_number = undefined;
}

function processOperatorInput(opInput) {

    // ensure that nothing happens if the equal button is pressed before it should
    if (opInput[0] === 'equal' && second_number === undefined) return;

    if (first_number === undefined) {
        setFirstNumber();   
        updateEntryDisplay(first_number);
        setOperation(opInput[0]);
        updateEntryDisplay(opInput[1]);
        resetFeedbackDisplay(); 
        second_number = 0;      // placeholder so that when equal is pressed, it calculates
    } else {
        setSecondNumber();
        updateEntryDisplay(second_number);
        feedback_display_value = operate(operation, first_number, second_number);
        updateFeedbackDisplay(feedback_display_value);
        if (opInput[0] === 'equal') {
            resetEntryDisplay();
            // resetFeedbackDisplay();
            resetFirstAndSecondNumbers();
        } else {
            resetEntryDisplay();
            setFirstNumber();
            updateEntryDisplay(first_number);
            setOperation(opInput[0]);
            updateEntryDisplay(opInput[1]);
            resetFeedbackDisplay();
            second_number = 0;
        }   
    }
}

function addOperatorButtonListener() {
    const operatorButtons = buttonsContainer.querySelectorAll(".operator-button");

    operatorButtons.forEach((operatorButton) => {
        operatorButton.addEventListener('mousedown', (e) => {
            operatorButton.classList.add('operator-button-clicked');
        });    
        operatorButton.addEventListener('mouseout', () => {
            operatorButton.classList.remove('operator-button-clicked');
        });
        operatorButton.addEventListener('click', () => {
            operatorButton.classList.remove('operator-button-clicked');
            opButtonClicked = [operatorButton.id, operatorButton.innerText];
            processOperatorInput(opButtonClicked);
        });    
    });
}

function resetCalculator() {
    entry_display_value = '';
    updateEntryDisplay(entry_display_value);
    feedback_display_value = default_feedback_display_value;
    updateFeedbackDisplay(default_feedback_display_value);
    decimalClicked = false;
}

function setInverseOfInput() {
    if (feedback_display_value == 0) return;

    let result = -Math.abs(feedback_display_value);

    feedback_display_value = result.toString();
    updateFeedbackDisplay(feedback_display_value);
}

function backspace() {
    if (feedback_display_value == 0) return;

    feedback_display_value = feedback_display_value.slice(0, -1);

    if (feedback_display_value.length === 0) feedback_display_value = 0;

    updateFeedbackDisplay(feedback_display_value);
}

function processModButton(modInput) {
    if (modInput === 'clear') {
        resetCalculator();
    } else if (modInput === 'inverse') {
        setInverseOfInput();
    } else {
        backspace();
    }
}

function addModButtonListeners() {
    const modButtons = buttonsContainer.querySelectorAll(".mod-button");

    modButtons.forEach((modButton) => {
        modButton.addEventListener('mousedown', (e) => {
            modButton.classList.add('mod-button-clicked');
        });    
        modButton.addEventListener('mouseout', () => {
            modButton.classList.remove('mod-button-clicked');
        });
        modButton.addEventListener('click', () => {
            modButton.classList.remove('mod-button-clicked');
            modButtonClicked = modButton.id;
            processModButton(modButtonClicked);
        });    
    });
}




addNumericalButtonListeners();
addModButtonListeners();
addOperatorButtonListener();

