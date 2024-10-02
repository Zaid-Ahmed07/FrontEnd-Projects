//Function to check if email is valid
function isValidEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//function to check if required fields have data
function checkRequired(inputArray) {
    inputArray.forEach(function (input) {
        if (input.value === '') {
            showError(input,`${getFieldId(input)} is required`);
        } else {
            showSuccess(input);
        }
    }); 
}

//Function to check length of the input field
function checkLength(input, min, max) {
    if (input.value.length < min ) {
        showError(input,`${getFieldId(input)} need to be atleast ${min} characters` )
    } else if (input.value.length > max) {
        showError(input,`${getFieldId(input)} need to be less ${max} characters` )
    } else {
        showSuccess(input);
    }
}

//Function to get the id of the input field
function getFieldId(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//Event Listners
//Creating event listner for submit button
form.addEventListener('submit', function (e) {
    //Stop page from reloding    
    e.preventDefault();

    checkRequired({ username, email, password, password2 })
    checkLength(username,3,10);
    checkLength(password,6,30);
})