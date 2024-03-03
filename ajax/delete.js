document.addEventListener("DOMContentLoaded", function () {
  const deleteUserButtons = document.querySelectorAll(".delete-user-btn");

  // Function to handle the Ajax request for deleting a user
  const handleDeleteUser = (userId) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        try {
          const data = JSON.parse(this.responseText);

          if (data.status === "success") {
            alert(data.message);
            // Reload the page or update the user list as needed
            location.reload();
          } else {
            console.error("Error deleting user:", data.message);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    xhttp.open("POST", "../server/delete.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`userId=${userId}`);
  };

  // Attach click event to each delete button
  deleteUserButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.dataset.userId;
      const confirmDelete = confirm(
        "Are you sure you want to delete this user?"
      );

      if (confirmDelete) {
        handleDeleteUser(userId);
      }
    });
  });
});
