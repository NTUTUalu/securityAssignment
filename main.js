var nameError = document.getElementById("name-Error");

var emailError = document.getElementById("email-Error");
var passwordError = document.getElementById("password-Error");
var confirmError = document.getElementById("confirm-Error");
var submitError = document.getElementById("form-Error");
var formError = document.getElementById("form-Error");
var messageError = document.getElementById("register-Error");
var valuesError = document.getElementById("values-Error");
var confirm2Error = document.getElementById("confirmPassword-Error");


function validateName(){
    var name = document.getElementById('namefield').value;

    if (name.length == 0) {
        nameError.innerHTML = "Name is required";
        return false;

    }

    //?this segment will be vulnerability
    if (name.match(/[0-9]/)) {
        nameError.innerHTML = "Name should not include numbers";
        return false;
    }
    var spaceCount = (name.match(/ /g) || []).length;
    if (spaceCount > 1) {
        nameError.innerHTML = "Include only first and last name";
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        //we are saying the first character must be an alphabet, there will be a space, then any character from A-z
        nameError.innerHTML = "Write full name";
        return false;
        //so this error will be thrown if the first letter is not an alphabet and there is a space of more than 1 between the two words
    }
    nameError.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;
}

function validateEmail() {
    var email = document.getElementById('emailfield').value;

    if (email.length == 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[A-Za-z\._-]+@[A-Za-z]+\.(com|za)$/i)) {
        emailError.innerHTML = 'Email invalid';
        return false;
    }
    emailError.innerHTML =  '<i class="fas fa-check-circle"></i>';
    return true;
}

function validateEmail_v2() {
    var email = document.getElementById('emailfield').value;

    if (email.length == 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML = 'Email invalid';
        return false;
    }
    emailError.innerHTML = '';
    return true;
}
function validatePassword() {
    var pass = document.getElementById('passwordfield').value;
    var minLength = 8;
    var maxLengthWeak = 10;
    var maxLengthStrong = 16;
    var length = pass.length;

    // Regular expressions to check for uppercase, lowercase, and numbers
    var hasUppercase = /[A-Z]/.test(pass);
    var hasLowercase = /[a-z]/.test(pass);
    var hasNumber = /\d/.test(pass);

    if (length < minLength) {
        passwordError.innerHTML = 'Password is too short, at least ' + minLength + ' characters required';
        return false;
    } else if (length >= minLength && length <= maxLengthWeak) {
        // Check if it's a weak password (requires at least one capital letter, one lowercase letter, and one number)
        if (!hasUppercase || !hasLowercase || !hasNumber) {
            passwordError.innerHTML = 'Weak Password';
        } else {
            passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
        }
    } else if (length > maxLengthWeak && length <= maxLengthStrong && hasUppercase && hasLowercase && hasNumber) {
        passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
    } else if (length > maxLengthStrong) {
        passwordError.innerHTML = 'Password is too long, maximum ' + maxLengthStrong + ' characters allowed';
        return false;
    } else {
        passwordError.innerHTML = 'include capital letter, a letter and a number';
        return false;
    }
    return true;
}


function validateConfirmPassword() {
    var pass = document.getElementById('passwordfield').value;
    var confirmPass = document.getElementById('confirmPasswordfield').value;
    var required = 8;
    var left = required - pass.length;

    if (left>0) {
        confirm2Error.innerHTML = left + ' more left';
         return false;
    }

    if (pass !== confirmPass) {
        confirm2Error.innerHTML = 'Passwords do not match';
        return false;
    }
 
    confirm2Error.innerHTML = '<i class="fas fa-check-circle"></i>';
    return true;

}

function validatePassword_v2() {
    var pass= document.getElementById('passwordfield').value;
    var required = 8;
    var left = required - pass.length;

    if (left>0) {
        passwordError.innerHTML = left + ' more left';
         return false;
    }
 
    passwordError.innerHTML = '';
    return true;

}


function validatePassword_v3() {
    var pass= document.getElementById('confirmfield').value;
    var required = 8;
    var left = required - pass.length;

    if (left>0) {
        confirmError.innerHTML = left + ' more left';
         return false;
    }
 
    confirmError.innerHTML = '';
    return true;

}


// <----------- formValidation -------------->


function validateForm() {
    if (!validateName()|| !validateEmail() || !validatePassword() || !validateConfirmPassword()) {
        formError.style.display = 'block';
        formError.innerHTML = 'Please fix error to submit';
        setTimeout(function() {submitError.style.display = 'none';},3000);
        return false;
    }
}

function validateForm2() {
    if (!validateEmail() || !validatePassword() ) {
        formError.style.display = 'block';
        formError.innerHTML = 'Please fix error to submit';
        setTimeout(function() {submitError.style.display = "none";},3000);
        return false;
    }
}


function validateForm3() {
    if ( !validateEmail_v2() || !validatePassword_v2() || !validatePassword_v3()) {
        formError.style.display = 'block';
        formError.innerHTML = 'Please fix error to submit';
        setTimeout(function() {submitError.style.display = 'none';},3000);
        return false;
    }
    const pass= document.getElementById('passwordfield').value;
    const pass2= document.getElementById('confirmfield').value;

    if (pass != pass2) {
        formError.style.display = 'block';
        formError.innerHTML = 'Passwords do not match';
        setTimeout(function() {submitError.style.display = 'none';},3000);
        return false;
    }
}
