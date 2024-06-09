var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var tableBody = document.getElementById("tableBody");
var searchInput = document.getElementById("searchInput");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var userName = document.getElementById("userName");
var logoutBtn = document.getElementById("logoutBtn");
var loginBtn = document.getElementById("loginBtn");
var sites;
var updateIndex;

// Display sites from local storage if available
if (localStorage.getItem("sites") == null) {
  sites = [];
} else {
  sites = JSON.parse(localStorage.getItem("sites"));
  displaySites(sites);
}

function localStorageSetItem() {
  localStorage.setItem("sites", JSON.stringify(sites));
}

// Create new site when submit button is clicked
function createSite() {
  var isSiteNameValid = validation(siteName);
  var isSiteURLValid = validation(siteURL);

  if (isSiteNameValid && isSiteURLValid) {
    var newSite = {
      name: siteName.value,
      url: siteURL.value,
      originalIndex: sites.length,
    };
    sites.push(newSite);
    displaySites(sites);
    updateFormValues();
    localStorageSetItem();
  }
}

// Display sites
function displaySites(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    content +=
      "<tr>" +
      "<td>" +
      (i + 1) +
      "</td>" +
      "<td>" +
      arr[i].name +
      "</td>" +
      "<td><a href='https://" +
      arr[i].url +
      "' target='_blank' class='btn btn-visit text-white'><i class='fa-solid fa-eye pe-2'></i>Visit</a></td>" +
      "<td><button class='btn btn-dark' onclick='setFormForUpdate(" +
      arr[i].originalIndex +
      ")'><i class='fa-solid fa-pen pe-2'></i>Update</button></td>" +
      "<td><button class='btn btn-danger' onclick='deleteSite(" +
      arr[i].originalIndex +
      ")'><i class='fa-solid fa-trash-can pe-2'></i>Delete</button></td>" +
      "</tr>";
  }
  tableBody.innerHTML = content;
}

// Set form values either values or empty string
function updateFormValues(flag) {
  siteName.value = flag ? flag.name : "";
  siteURL.value = flag ? flag.url : "";
  searchInput.value = "";
}

// Delete site
function deleteSite(deletedIndex) {
  sites.splice(deletedIndex, 1);
  for (var i = 0; i < sites.length; i++) {
    sites[i].originalIndex = i;
  }
  displaySites(sites);
  localStorageSetItem();
  updateBtn.classList.add("d-none");
  submitBtn.classList.remove("d-none");
  updateFormValues();
}

// Search site by name
function searchSite() {
  var found = false;
  var searchedSites = [];
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
      found = true;
      var siteCopy = JSON.parse(JSON.stringify(sites[i]));
      siteCopy.originalIndex = i;
      searchedSites.push(siteCopy);
    }
  }
  displaySites(searchedSites);
  if (!found) {
    tableBody.innerHTML =
      "<td colspan='5'><h4 class='fw-bold text-danger my-2'>No Available Match</h4></td>";
  }
}

// Set form for update
function setFormForUpdate(index) {
  updateBtn.classList.remove("d-none");
  submitBtn.classList.add("d-none");
  updateIndex = index;
  updateFormValues(sites[index]);
}

// Update site
function updateSite() {
  sites[updateIndex].name = siteName.value;
  sites[updateIndex].url = siteURL.value;
  updateBtn.classList.add("d-none");
  submitBtn.classList.remove("d-none");
  displaySites(sites);
  localStorageSetItem();
  updateFormValues();
}

// Validation
function validation(element) {
  var regex = {
    siteName: /^[a-zA-Z0-9]{3,}$/,
    siteURL: /^(www\.)?([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})([a-zA-Z0-9#?&=._-]*)*$/,
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

// Authentication
function auth() {
  if (localStorage.getItem("currentUser")) {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    userName.innerHTML =
      "<span class='welcome'>Hello " + currentUser.username + "</span>";
    loginBtn.classList.replace("d-block", "d-none");
    logoutBtn.classList.replace("d-none", "d-block");
  }
}
auth();

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// Login
function login() {
  window.location.href = "login.html";
}
