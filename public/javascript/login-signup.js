// LOGIN
// Form input
const loginForm = document.querySelector(".login-form");

// Send credentials to server
const login = async function (e) {
  e.preventDefault();

  // login Username
  const loginUsername = document.querySelector("#username-login").value.trim();
  // login Password
  const loginPassword = document.querySelector("#password-login").value.trim();

  // Basic validation
  if ((loginUsername, loginPassword)) {
    // Post to server
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });
    if (response.ok) {
      document.location.replace("/calendar");
    } else {
      alert(response.statusText);
    }
  }
};

// Listen for submit event
loginForm.addEventListener("submit", login);

// SIGNUP

// Form input
const signUpForm = document.querySelector(".signup-form");

// Send credentials to server
const createAccount = async function (e) {
  e.preventDefault();

  // Signup Username
  const signUpUsername = document
    .querySelector("#username-signup")
    .value.trim();
  // Signup Password
  const signUpPassword = document
    .querySelector("#password-signup")
    .value.trim();

  // Basic validation
  if ((signUpUsername, signUpPassword)) {
    // Post to server
    const response = await fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    });
    if (response.ok) {
      document.location.replace("/calendar");
    } else {
      alert(response.statusText);
    }
  }
};

// Listen for submit event
signUpForm.addEventListener("submit", createAccount);
