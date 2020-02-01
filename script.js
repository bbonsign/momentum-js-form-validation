// ================ VARIABLES ==================
// Set up list of input elements for looping through
const formObject = document.querySelector("#parking-form");
const inputFields = document.querySelectorAll("input");
// const formFields = document.querySelectorAll(".input-field");



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
    // validateName();
    // validateCar();
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
    let alertClass = "alert-"+type;
    let dataAttribute = alertText;

    parent.classList.remove("input-valid");
    if (!parent.classList.contains("input-invalid")) {
        parent.classList.add("input-invalid");
    }

    let hasAlert = false;
    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].dataset.alert == dataAttribute) {
            hasAlert = true;
        }
    }
    if (hasAlert == false) {
        let p = document.createElement("p");
        p.classList.add("alert")
        p.classList.add(alertClass);
        p.setAttribute("data-alert", dataAttribute);
        p.textContent = alertText;
        parent.appendChild(p);
    }
}

/**
 * Removes any alert elements that has been added,
 * and adds "input-valid" class to partent div
 */
function removeAlert(inputElement, dataText) {
    let parent = inputElement.closest(".input-field");

    parent.classList.remove("input-invalid");
    parent.classList.add("input-valid");

    for (let child of parent.children) {
        if (child.dataset.alert == dataText) {
            child.remove();
        }
    }
}




// =========== VALIDATION FUNCTIONS ====================
function markEmptyFields() {
    let regEx = /^\s*$/;
    for (let input of inputFields) {
        if (input.value == "" || regEx.test(input.value)) {
            raiseAlert(input, "Required Field", "danger");
        }
        else {
            removeAlert(input, "Required Field");
        }
    }
}


function calculateCost() {

}

function displayCost() {

}