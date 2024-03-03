document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("#loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form data
    const formData = new FormData(loginForm);

    // Send an Ajax request to the server
    fetch("../server/login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert(data.message); // You can replace this with your own success handling logic
          // Redirect to another page if login is successful
          // window.location.href = "dashboard.html";
        } else {
          alert(data.message); // You can replace this with your own error handling logic
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
