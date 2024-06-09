var signupUsername = document.getElementById("signupUsername");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupBtn = document.getElementById("signupBtn");
var users = [];

if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}

//Sign Up
function createAccount() {
  isValidUsername = validation(signupUsername);
  isValidEmail = validation(signupEmail);
  isValidPassword = validation(signupPassword);
  isExistingEmail = emailAlreadyExists();

  if (isValidUsername && isValidEmail && isValidPassword && !isExistingEmail) {
    var userObject = {
      username: signupUsername.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };
    users.push(userObject);
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "login.html";
  }
  else if (isExistingEmail) {
    emailAlreadyExists();
  }
}

//Validation
function validation(element) {
  var regex = {
    signupUsername: /^[a-zA-Z0-9 ]{3,}$/,
    signupEmail: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    signupPassword: /^(?=.*[0-9])(?=.*[#!?@$%^&*_\-]).{8,}$/,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
//Email already exists
function emailAlreadyExists() {
  var users = JSON.parse(localStorage.getItem("users"));
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == signupEmail.value) {
      document.getElementById("error").classList.replace("d-none", "d-block");
      document.getElementById("error").innerHTML = "Email already exists";
      return true;
    } else {
      return false;
    }
  }
}
