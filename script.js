// ================ VARIABLES ==================
// Set up list of input elements for looping through
const formObject = document.querySelector("#parking-form");
const inputFields = document.querySelectorAll("input");
const formFields = document.querySelectorAll(".input-field");
let currentYear = new Date().getFullYear();



// FOR TESTING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// MAKE SURE TO DELETE OR COMMENT OUT!!!!!!!!!!!
validateForm()



// ================ FUNCTIONS ===================
/**
 * Checks all the input fields for valid values.
 * For fields with invalid input, this function marks them as
 * invalid for Shoelace styling.
 */
function validateForm() {
    markEmptyFields();
    // validateTextFields();
    validateName();
    validateCar();
    // validateDate();
    // validateDays();
    // validateCard();
    // validateCVV();
    // validateExpiration();
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
    if (!parent.classList.contains("input-invalid")) {
        parent.classList.add("input-invalid");
    }

    let hasAlert = false;
    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].hasAttribute(dataAttribute)) {
            hasAlert = true;
        }
    }
    if (hasAlert == false) {
        let p = document.createElement("p");
        p.classList.add("alert")
        p.classList.add(alertType);
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
 * and adds "input-valid" class to partent div
 */
function removeAlertMarkValid(inputElement, alertText, type) {
    let parent = inputElement.closest(".input-field");
    let dataAttribute = "data-" + type;
    let dataValue = alertText;

    parent.classList.remove("input-invalid");
    parent.classList.add("input-valid");

    for (let child of parent.children) {
        if (child.hasAttribute(dataAttribute)) {
            child.remove();
        }
    }
}

function calculateCost() {

}

function displayCost() {

}


// =========== VALIDATION FUNCTIONS ====================
function markEmptyFields() {
    let regEx = /^\s*$/;
    for (let input of inputFields) {
        if (input.value == "" || regEx.test(input.value)) {
            raiseAlert(input, "Required field", "danger");
        }
        else {
            removeAlertMarkValid(input, "Required field", "danger");
        }
    }
}

function getInputByID(idSelector) {
    return document.querySelector(idSelector);
}

function validateName() {
    let regEx = /^[\w+\s]*$/;
    let input = getInputByID("#name");
    if (regEx.test(input.value)) {
        removeAlertMarkValid(input, "Alphanumeric characters only", "warning")
    }
    else {
        raiseAlert(input, "Alphanumeric characters only", "warning")
    }
}

function validateCar() {
    validateCarYear();
    validateCarMake();
    validateCarModel();
    let carInputs = document.querySelectorAll(".input-field input");
    for (let input of carInputs) {
        let regEx = /^\s*$/;
        if (input.value == "" || regEx.test(input.value)) {
            raiseAlert(input, "Required field", "danger");
        }
    }
}

function validateCarYear() {
    let input = getInputByID("#car-year");
    let value = Number(input.value);
    if (!(1900 < value && value < currentYear)) {
        raiseAlert(input, "Enter a valid year", "warning");
    }
}

function validateCarMake() {
    let regEx = /^[\w+\s]*$/;
    let input = getInputByID("#car-make");
    if (regEx.test(input.value)) {
        removeAlertMarkValid(input, "Alphanumeric characters only", "warning")
    }
    else {
        raiseAlert(input, "Alphanumeric characters only", "warning")
    }
}

function validateCarModel() {
    let regEx = /^[\w+\s]*$/;
    let input = getInputByID("#car-model");
    if (regEx.test(input.value)) {
        removeAlertMarkValid(input, "Alphanumeric characters only", "warning")
    }
    else {
        raiseAlert(input, "Alphanumeric characters only", "warning")
    }
}