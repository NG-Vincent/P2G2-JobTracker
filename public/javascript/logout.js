// LOGOUT
const logoutBtn = document.querySelector("#logout");

const logout = async function () {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    // document.location.replace("/");
  } else {
    console.log(response);
    alert(response.statusText);
  }
};

logoutBtn.addEventListener("click", logout);
