let id = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

const form = id("form");
const errorMsg = classes("error");
const successMsg = id("form-success-msg");

const username = id("name");
const phone = id("phone");
const email = id("email");
const course = id("course");

//let successIcon = classes("success-icon");
//let failureIcon = classes("failure-icon");

username.addEventListener("blur", () => {
  check(username, 0, "Name cannot be blank!");
});
phone.addEventListener("blur", () => {
  check(phone, 1, "Phone cannot be blank!");
});
email.addEventListener("blur", () => {
  check(email, 2, "Email cannot be blank!");
});
course.addEventListener("blur", () => {
  check(course, 3, "Course cannot be blank!");
});

let errorCount = 0;

form.addEventListener("submit", (e) => {
  errorCount = 0;

  check(username, 0, "Name cannot be blank!");
  check(phone, 1, "Phone number cannot be blank!");
  check(email, 2, "Email cannot be blank!");
  check(course, 3, "Course cannot be blank!");

  if (errorCount > 0) {
    e.preventDefault();
    return;
  }

  onSuccessfulSubmission();
});

function onSuccessfulSubmission() {
  form.classList.add("hidden");
  successMsg.classList.remove("hidden");
  successMsg.classList.add("flex");
}

let check = (id, serial, message) => {
  const trimmedValue = id.value.trim();
  id.value = trimmedValue;

  if (trimmedValue === "") {
    showInvalidInputIndication(id, serial, message);
  } else {
    let response;

    switch (serial) {
      case 0:
        response = validateName(id);
        break;
      case 1:
        response = validatePhoneNo(id);
        break;
      case 2:
        response = validateEmail(id);
        break;
      default:
        response = true;
        break;
    }

    if (response == true) {
      showValidInputIndication(id, serial);
    } else {
      showInvalidInputIndication(id, serial, response);
    }
  }
};

function showInvalidInputIndication(id, serial, msg) {
  errorMsg[serial].innerHTML = msg;

  errorCount++;

  id.classList.remove("border-font-color-sec");

  if (!id.classList.contains("border-2")) {
    id.classList.add("border-2");
  }

  id.classList.add("border-font-color-red-dark");
}

function showValidInputIndication(id, serial) {
  errorMsg[serial].innerHTML = "";

  id.classList.remove("border-font-color-red-dark");

  if (!id.classList.contains("border-2")) {
    id.classList.add("border-2");
  }

  id.classList.add("border-font-color-sec");
}

function validateName(id) {
  if (id.value.length < 2) {
    return "Name must be atleast 2 characters long!";
  } else {
    return true;
  }
}

function validatePhoneNo(id) {
  var phoneno = /^(6|7|8|9)\d{9}$/;

  if (!id.value.match(phoneno)) {
    return "Please enter a valid contact number!";
  } else {
    return true;
  }
}

function validateEmail(id) {
  var reg = new RegExp("^[a-zA-Z0-9_.]+@[a-zA-Z0-9.]+$");

  if (!reg.test(id.value)) {
    return "Please enter a valid email address!";
  } else {
    return true;
  }
}
