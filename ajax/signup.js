document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.querySelector("#signupForm");

  // Function to handle the Ajax request
  const handleSignup = (formData) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        try {
          const data = JSON.parse(this.response);

          if (data.status === "success") {
            alert(data.message);
            // Redirect or perform other actions upon successful signup
          } else {
            alert(data.message);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    xhttp.open("POST", "../server/signup.php", true);
    // Set the correct content type
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Serialize the FormData object into URL-encoded format
    const serializedFormData = new URLSearchParams(formData).toString();

    xhttp.send(serializedFormData);
  };

  // Attach the submit event to the form
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve form data
    const formData = new FormData(signupForm);

    // Call the Ajax function
    handleSignup(formData);
  });
});
