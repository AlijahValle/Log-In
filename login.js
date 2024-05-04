const form = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const formInputs = document.getElementsByClassName("input-field");

/*Event Listeners*/
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

for (let i = 0; i < formInputs.length; i++) {
  const input = formInputs[i];

  input.addEventListener("blur", function (e) {
    const inputValue = input.value.trim();

    if (input === username) {
      validateUsername(inputValue);
    } else if (input === password) {
      validatePassword(inputValue);
    }
  });
}

/*Helper Validate Functions*/
function validateInputs() {
  let formData = new FormData();

  let isValidUsername = validateUsername(username.value.trim());
  let isValidPassword = validatePassword(password.value.trim());

  if (isValidUsername && isValidPassword) {
    let inputedUsername = username.value.trim();
    let inputedPassword = password.value.trim();

    formData.append("username", inputedUsername);
    formData.append("password", inputedPassword);

    sendData(formData);
  }
}

function setError(element, message) {
  const box = element.parentElement;
  const errorMsg = box.querySelector(".error");

  errorMsg.innerText = message;
  box.classList.add("error");
  box.classList.remove("success");
}

function setSuccess(element, message) {
  const box = element.parentElement;
  const errorMsg = box.querySelector(".error");

  errorMsg.innerText = message;
  box.classList.add("success");
  box.classList.remove("remove");
}

function validateUsername(inputValue) {
  if (inputValue === "") {
    setError(username, "Username is required");
    return false;
  } else if (inputValue.length < 3 || inputValue.length > 20) {
    setError(username, "Username must be 3 to 20 characters long");
    return false;
  } else if (!isValidUsername(inputValue)) {
    setError(username, "Invalid Username Format");
    return false;
  } else {
    setSuccess(username, "");
    return true;
  }
}

function validatePassword(inputValue) {
  if (inputValue === "") {
    setError(password, "Password is required");
    return false;
  } else if (inputValue.length < 8) {
    setError(password, "Password must be at least 8 characters long.");
    return false;
  } else if (!isValidPassword(inputValue)) {
    setError(
      password,
      "Password must contain at least one uppercase letter, lowercase letter, digit, and special character (@, $, !, %, *, ?, or &)"
    );
    return false;
  } else {
    setSuccess(password, "");
    return true;
  }
}

function isValidUsername(input) {
  const regex = /^[a-zA-Z0-9_.-]{3,20}$/;
  return regex.test(input);
}

function isValidPassword(input) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(input);
}
