document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("#loginForm");

  // Function to handle the Ajax request
  const handleLogin = (formData) => {
    fetch("../server/login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  // Attach the submit event to the form
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form data
    const formData = new FormData(loginForm);

    // Call the Ajax function
    handleLogin(formData);
  });
});
