var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");

function login() {
  if (localStorage.getItem("users")) {
    isValidEmail = validation(loginEmail);
    isValidPassword = validation(loginPassword);
    if (isValidEmail && isValidPassword) {
      var users = JSON.parse(localStorage.getItem("users"));
      var validUser = false;
      for (var i = 0; i < users.length; i++) {
        if (
          loginEmail.value == users[i].email &&
          loginPassword.value == users[i].password
        ) {
          validUser = true;
          break;
        }
      }
      if (validUser) {
        window.location.href = "index.html";
        localStorage.setItem("currentUser", JSON.stringify(users[i]));
      } else {
        document.getElementById("error").classList.replace("d-none", "d-block");
        document.getElementById("error").innerHTML = "Invalid Credentials";
      }
    }
  }
}
//Validation
function validation(element) {
  var regex = {
    loginEmail: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    loginPassword: /^(?=.*[0-9])(?=.*[#!?@$%^&*_\-]).{8,}$/,
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