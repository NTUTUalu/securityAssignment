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


// crud operations

// Variables
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const updateNameInput = document.getElementById("update-name-input");
const updateEmailInput = document.getElementById("update-email-input");
const updateFeedbackInput = document.getElementById("update-feedback-input"); // Add the feedback input
const updateCommentsInput = document.getElementById("update-comments-input"); // Add the comments input
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = null;
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zAZ0-9-]+)*$/;

// Functions
function renderTable() {
    tableBody.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const tr = document.createElement("tr");
      const idTd = document.createElement("td");
      const nameTd = document.createElement("td");
      const emailTd = document.createElement("td");
      const commentsTd = document.createElement("td"); // Create a new <td> for Comments
      const feedbackTd = document.createElement("td"); // Create a new <td> for Feedback
      const actionsTd = document.createElement("td");
      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      idTd.innerText = user.id;
      nameTd.innerText = user.name;
      emailTd.innerText = user.email;
      commentsTd.innerText = user.comments; // Display the "Comments" value
      feedbackTd.innerText = user.feedback; // Display the "Feedback" value
      editBtn.innerText = "Edit";
      deleteBtn.innerText = "Delete";
      editBtn.addEventListener("click", () => {
        showUpdateForm(user.id);
      });
      deleteBtn.addEventListener("click", () => {
        deleteUser(user.id);
      });
      tr.appendChild(idTd);
      tr.appendChild(nameTd);
      tr.appendChild(emailTd);
      tr.appendChild(commentsTd); // Add "Comments" <td> to the row
      tr.appendChild(feedbackTd); // Add "Feedback" <td> to the row
      tr.appendChild(actionsTd);
      actionsTd.appendChild(editBtn);
      actionsTd.appendChild(deleteBtn);
      tableBody.appendChild(tr);
    }
  }
  function addUser() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const comments = "Null"; // Default value for comments
    const feedback = "Null"; // Default value for feedback
  
    if (email.match(validRegex)) {
      if (name && email !== null) {
        var id = 1;
        var val = users.map(function (x) {
          return x.id;
        }).indexOf(id);
        while (val != -1) {
          id++;
          val = users.map(function (x) {
            return x.id;
          }).indexOf(id);
        }
  
        const user = {
          id: id,
          name: name,
          email: email,
          comments: comments,
          feedback: feedback,
        };
  
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        nameInput.value = "";
        emailInput.value = "";
        renderTable();
      } else {
        alert("Name is Required");
      }
    } else {
      alert("Invalid email address!");
    }
  }
  // ...

  function showUpdateForm(userId) {
    const user = users.find((user) => user.id === userId);
    if (user) {
      updateNameInput.value = user.name;
      updateFeedbackInput.value = user.feedback;
      currentUserId = user.id;
      updateBtn.addEventListener("click", updateUserFeedback);
      cancelBtn.addEventListener("click", hideUpdateForm);
      updateBtn.style.display = "inline-block";
      cancelBtn.style.display = "inline-block";
      updateNameInput.style.display = "inline-block";
      updateFeedbackInput.style.display = "inline-block";
      document.getElementById("update-container").style.display = "block";
    }
  }
  
  function updateUserFeedback() {
    const feedback = updateFeedbackInput.value;
  
    const index = users.findIndex((user) => user.id === currentUserId);
    if (index !== -1) {
      users[index].feedback = feedback; // Update feedback only
      localStorage.setItem("users", JSON.stringify(users));
      renderTable();
      hideUpdateForm();
    }
  }
  
  // ...
  function hideUpdateForm() {
    updateNameInput.value = "";
    updateFeedbackInput.value = "";
    currentUserId = null;
    updateBtn.removeEventListener("click", updateUserFeedback);
    cancelBtn.removeEventListener("click", hideUpdateForm);
    updateBtn.style.display = "none";
    cancelBtn.style.display = "none";
    updateNameInput.style.display = "none";
    updateFeedbackInput.style.display = "none";
    document.getElementById("update-container").style.display = "none";
  }
  
function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));
  if (users.length == 0){
    hideUpdateForm();
  };
  renderTable();
}

// Event Listeners
addBtn.addEventListener("click", addUser);

// Initialize table
renderTable();

///drop down menu for request grades
function myFunction(dropdownId) {
    document.getElementById(dropdownId).classList.toggle("show");
}

function selectName(name) {
    var selectedName = document.getElementById("selectedName");
    selectedName.textContent = name;
    document.getElementById("myDropdown1").classList.remove("show");
}

function selectEmail(email) {
    var selectedEmail = document.getElementById("selectedEmail");
    selectedEmail.textContent = email;
    document.getElementById("myDropdown2").classList.remove("show");
}

// validating student requests for their GeolocationCoordinates

function validateRequest() {
    var name = document.getElementById('selectedName').textContent;
    var email = document.getElementById('selectedEmail').textContent;
    
    if (name === 'Facilitator Name' || email === 'Facilitator Email') {
        alert('One or more fields are not selected.');
    } else {
        alert('Request sent');
        // You can submit the form or perform other actions here.
        window.location.href = 'home.html';
    }
}