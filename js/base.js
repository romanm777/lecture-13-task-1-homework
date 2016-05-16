// creates the form
var form = document.createElement("FORM");

// sets form attributes
var formAttribs = [
  { name: "name", value: "login" },
  { name: "action", value: "google.com"}
];
setAttributes(form, formAttribs);

// sets form inputs
setInputs(form);

// sets form validation
setValidation(form);

// append form to the document
document.getElementById("form_block").appendChild(form);



/////////////////////////////////////////////////////////////////
// Functions

function setAttributes(elem, attribs) {
  attribs.forEach(function(item) {
    var attr = document.createAttribute(item.name);
    attr.value = item.value;
    elem.setAttributeNode(attr);
  });
}

function setInputs(form) {
  // <input type="text" name="age">
  var age = document.createElement("INPUT");
  var attribs = [
    { name: "type", value: "text" },
    { name: "name", value: "age"}
  ];

  setAttributes(age, attribs);
  form.appendChild(age);

  // <input type="text" name="username">
  var userName = document.createElement("INPUT");
  attribs = [
    { name: "type", value: "text" },
    { name: "name", value: "username"}
  ];

  setAttributes(userName, attribs);
  form.appendChild(userName);

  //  <input type="text" name="date">
  var date = document.createElement("INPUT");
  attribs = [
    { name: "type", value: "text" },
    { name: "name", value: "date"}
  ];

  setAttributes(date, attribs);
  form.appendChild(date);

  //  <input type="submit" value="Validate Me">
  var ageInput = document.createElement("INPUT");
  attribs = [
    { name: "type", value: "submit" },
    { name: "value", value: "Validate Me"}
  ];

  setAttributes(ageInput, attribs);
  form.appendChild(ageInput);
}

function setValidation(form) {
  form.onsubmit = function (e) {
    e.preventDefault();

    // gets and initalize errors
    var errors = document.getElementById("errors");
    initErrors(errors);

    if(!checkAge()) {
      showError(errors, "age should contain only numbers!");
      return;
    }

    if(!checkUsername()) {
      showError(errors, "username should start from 'user_'");
      return;
    }

    if(!checkDate()) {
      alert("your data is invalid!");
      return;
    }

    // show success message
    showError(errors, "Your date is wonderfull!!! It's " + checkDate.dateStr, 'green');
  };
}

function initErrors(errors) {
  errors.innerText = "";
  errors.style.marginTop = 0;
}

function checkAge() {
  // age should contain only numbers
  // (pass) "123"
  // (pass) "0"
  // (pass) "008946798576948567948576948756984756"
  // (failed) "test"
  // (failed) "-1"
  // (failed) " 0"
  // (failed) "10e5"
  var input = getProperInput("age");
  var number = parseInt(input.value);

  if(isNaN(number)
  || number.toString().length !== input.value.length
  || number < 0) {
    input.focus();
    return false;
  }

  return true;
}

function checkUsername() {
  // username should start from "user_"
  // (pass) user_test
  // (pass) user_213kjasd
  // (pass) user_@gmail.com
  // (failed) john
  // (failed) _user_test
  // (failed) testuser_test
  var input = getProperInput("username");
  if(0 !== input.value.indexOf("user_")) {
    input.focus();
    return false;
  }

  return true;
}

function checkDate() {
  // field date should contain current date (format dd/mm/yyyy)
  // if data is not valid, alert message your data is invalid
  var SEPARATOR = "/";
  var input = getProperInput("date");

  // slash position check
  if(!(input.value.indexOf(SEPARATOR) === 2
      && input.value.indexOf(SEPARATOR, 3) === 5
      && input.value.length == 10)) {
    input.focus();
    return false;
  }

  // splits the date string to parts
  var dateParts = input.value.split(SEPARATOR);

  var day = parseInt(dateParts[0]);
  var month = parseInt(dateParts[1]);
  var year = parseInt(dateParts[2]);

  // check digits
  if(isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }

  // check data if correct
  var date = new Date(year, month - 1, day);
  if(isNaN(date.getTime())) {
    return false;
  }

  // saves the date for output
  checkDate.dateStr = date.toDateString();

  return true;
}

function getProperInput(name) {
  var inputs = document.getElementsByTagName("input");
  return Array.prototype.find.call(inputs, function(input) {
    return input.getAttribute("name") === name;
  });
}

function showError(error, text, bgColor) {
  errors.innerText = text;
  errors.style.marginTop = '-50px';

  if(arguments.length > 2)
    errors.style.backgroundColor = bgColor;
}
