// ================ VARIABLES ==================
// Set up list of input elements for looping through
const formObject = document.querySelector("#parking-form");
const inputFields = document.querySelectorAll("input");
const formFields = document.querySelectorAll(".input-field");
const totalDiv = document.querySelector("#total")
let currentDate = new Date();
let currentYear = currentDate.getFullYear();


// ================ Listeners =====================
formObject.addEventListener("input", checkForm);

formObject.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
        displayCost(calculateCost());
    }
    else {
        totalDiv.innerHTML = "";
    }
});


// ================ FUNCTIONS ===================
/**
 * Checks all the input fields for valid values.
 * For fields with invalid input, this function marks them as
 * invalid for Shoelace styling.
 */
function checkForm() {
    markEmptyFields();
    validateName();
    validateCar();
    validateDate();
    validateDays();
    validateCard();
    validateCVV();
    validateExpiration();
}

/**
 * Checks if alert text has already been added to
 * a form filed.  If not, then add it with appropriate
 * text.  Also adds class input-invalid to
 * The "type" argument should be a string, e.g. "danger" or "warning,"
 * which is to specify Shoelace styling classes
 */
function raiseAlert(inputElement, alertText, type) {
    let parent = inputElement.closest(".input-field");
    let alertType = "alert-" + type;
    let dataAttribute = "data-" + type;
    let dataValue = alertText;

    parent.classList.remove("input-valid");
    parent.classList.add("input-invalid");

    let hasAlert = false;
    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].dataset[type] == dataValue) {
            hasAlert = true;
        }
    }
    if (hasAlert == false) {
        let p = document.createElement("span");
        p.classList.add("alert", alertType);
        // p.classList.add(alertType);
        p.setAttribute(dataAttribute, dataValue);
        p.textContent = alertText;
        if (type == "danger") {
            parent.insertBefore(p, parent.children[1]);
        }
        else {
            parent.appendChild(p);
        }
    }
}

/**
 * Removes any alert elements that has been added,
 */
function removeAlert(inputElement, alertText, type) {
    let parent = inputElement.closest(".input-field");
    let dataAttribute = "data-" + type;
    let dataValue = alertText;

    for (let child of parent.children) {
        if (child.dataset[type] == dataValue) {
            child.remove();
        }
    }
}

/**
 * Adds "input-valid" class to partent div
 */
function markValid(formField) {
    formField.classList.remove("input-invalid");
    formField.classList.add("input-valid");
}

/**
 * Returns the form field containing a given input element
 */
function getFormField(input) {
    return input.closest(".input-field");
}

/**
 * Returns input element based on CSS id selector
 */
function getInputByID(idSelector) {
    return document.querySelector(idSelector);
}

function validateCardNumber(number) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number)) {
        return false;
    }
    return luhnCheck(number);
}

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}

/**
 * Returns true if all fields are valid, false otherwise
 */
function validateForm() {
    checkForm();
    for (let child of formObject.children) {
        if (child.classList.contains("input-invalid")) {
            return false;
        }
    }
    return true;
}

/**
 * The cost is $5 per weekday, and $7 per weekend day.
 * .map and .reduce will be very helpful in calculating the total cost.
 */
function calculateCost() {
    let cost = 0;
    let startDate = new Date(getInputByID("#start-date").value)
    // uses the current date, but with time set to midnight, to make calculatrions with
    let now = new Date(currentDate.toDateString());
    console.log(startDate);

    return cost
}

/**
 * show the user the total cost of their parking when they click the "Make Reservation" button.
 * The div with id "total" should be filled with text showing the cost.
 * This text should be removed if the form becomes invalid.
 */
function displayCost(cost) {
    totalDiv.textContent = `Your total cost is $${cost}.00.`;
    totalDiv.classList.add("alert", "alert-success")
}


// =========== VALIDATION FUNCTIONS ====================
function markEmptyFields() {
    for (let input of inputFields) {
        if (isEmpty(input)) {
            markEmpty(input);
        }
        else {
            unmarkEmpty(input);
        }
    }
}

/**
 * Returns true if the input is empty string or all whitespace
 *
 */
function isEmpty(input) {
    let regEx = /^\s*$/;  // Matches empty string or all whitespace
    return regEx.test(input.value);
}

function markEmpty(input) {
    raiseAlert(input, "Required field", "danger");
}

function unmarkEmpty(input) {
    markValid(getFormField(input));
    removeAlert(input, "Required field", "danger");
}

function validateName() {
    let regEx = /^[[\w+\s]|-|\.]+$/;
    let input = getInputByID("#name");
    if (isEmpty(input)) {
        removeAlert(input, "Alphanumeric characters only", "warning");
        markEmpty(input);
    }
    else if (regEx.test(input.value)) {
        removeAlert(input, "Alphanumeric characters only", "warning");
        markValid(getFormField(input));
    }
    else {
        raiseAlert(input, "Alphanumeric characters only", "warning");
    }
}


function validateCar() {
    validateCarYear();
    validateCarMakeAndModel();

    // let carField = document.querySelector("#car-field");
    // for (let child of carField.children) {
    //     if (child.ta
    //     }
    // }
}

function validateCarYear() {
    let input = getInputByID("#car-year");
    let value = Number(input.value);
    if (isEmpty(input)) {
        removeAlert(input, "Enter a valid year", "warning");
        markEmpty(input);
    }
    else if (!(1900 < value && value < currentYear)) {
        raiseAlert(input, "Enter a valid year", "warning");
    }
    else {
        removeAlert(input, "Enter a valid year", "warning");
        // markValid(getFormField(input));
    }
}

function validateCarMakeAndModel() {
    let regEx = /^[\w+\s]*$/;
    let makeInput = getInputByID("#car-make");
    let modelInput = getInputByID("#car-model");
    let value = makeInput.value + modelInput.value;
    if (isEmpty(makeInput) || isEmpty(modelInput)) {
        removeAlert(makeInput, "Alphanumeric characters only", "warning");
        markEmpty(makeInput);
    }
    else if (regEx.test(value)) {
        removeAlert(makeInput, "Alphanumeric characters only", "warning");
        // markValid(getFormField(makeInput));
    }
    else {
        raiseAlert(makeInput, "Alphanumeric characters only", "warning");
    }
}

function validateDate() {
    let input = getInputByID("#start-date");
    let value = new Date(input.value);
    if (isEmpty(input)) {
        removeAlert(input, "Enter future date", "warning");
        markEmpty(input);
    }
    else if (value < currentDate) {
        raiseAlert(input, "Enter future date", "warning");
    }
    else {
        removeAlert(input, "Enter future date", "warning");
        markValid(getFormField(input));
    }
}

function validateDays() {
    let input = getInputByID("#days");
    let value = Number(input.value);
    if (isEmpty(input)) {
        removeAlert(input, "Up to 30 days", "warning");
        markEmpty(input);
    }
    else if (0 < value && value < 31) {
        removeAlert(input, "Up to 30 days", "warning");
        markValid(getFormField(input));
    }
    else {
        raiseAlert(input, "Up to 30 days", "warning");
    }
}

function validateCard() {
    let input = getInputByID("#credit-card");
    let value = input.value;
    value = value.replace(/\s|-/g, "");
    if (isEmpty(input)) {
        removeAlert(input, "Invalid Card", "warning");
        markEmpty(input);
    }
    else if (validateCardNumber(value)) {
        removeAlert(input, "Invalid Card", "warning");
        markValid(getFormField(input));
    }
    else {
        if (input.value.length > 0) {
            raiseAlert(input, "Invalid Card", "warning");
        }
    }
}

function validateCVV() {
    let input = getInputByID("#cvv");
    let value = input.value;
    let regEx = /^\s*\d{3}\s*$/;
    if (isEmpty(input)) {
        removeAlert(input, "Must be three digits", "warning");
        markEmpty(input);
    }
    else if (regEx.test(value)) {
        removeAlert(input, "Must be three digits", "warning");
        markValid(getFormField(input));
    }
    else {
        raiseAlert(input, "Must be three digits", "warning");
    }
}

/**
 * converts MM/YY to MM/01/20YY to check for a expiration date
 * in the future
 */
function validateExpiration() {
    let input = getInputByID("#expiration");
    let value = input.value;
    let regEx = /^\d\d\/\d\d$/;

    if (isEmpty(input)) {
        removeAlert(input, "Enter valid expiration date", "warning");
        markEmpty(input);
    }
    else if (regEx.test(value) && (0 < value.slice(0, 2) && value.slice(0, 2) < 13)) {
        value = value.slice(0, 3) + "01/20" + value.slice(3);
        // value = String(value);
        // console.log(typeof value, value);
        let expDate = new Date(value);
        if (expDate < currentDate) {
            raiseAlert(input, "Enter valid expiration date", "warning");
        }
        else {
            removeAlert(input, "Enter valid expiration date", "warning");
            markValid(getFormField(input));
        }
    }
    else {
        raiseAlert(input, "Enter valid expiration date", "warning");
    }
}