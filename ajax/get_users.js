document.addEventListener("DOMContentLoaded", function () {
  const getUsers = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        try {
          const data = JSON.parse(this.responseText);

          if (data.status === "success") {
            updateTable(data.users);
          } else {
            console.error("Error fetching users:", data.message);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    xhttp.open("GET", "../server/get_users.php", true);
    xhttp.send();
  };

  const deleteUser = (userId) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        try {
          const data = JSON.parse(this.responseText);

          if (data.status === "success") {
            getUsers(); // Refresh the user list after deletion
          } else {
            console.error("Error deleting user:", data.message);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    };

    xhttp.open("POST", "../server/delete_user.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`userId=${userId}`);
  };

  const updateTable = (users) => {
    const tableBody = document.querySelector("#userTable tbody");

    tableBody.innerHTML = "";

    users.forEach((user, index) => {
      const row = createTableRow(index + 1, user);

      tableBody.appendChild(row);
    });
  };

  const createTableRow = (index, user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
          <th scope="row">${index}</th>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.type}</td>
          <td>
              <button type="button" class="btn btn-warning btn-sm me-2">Update</button>
              <button type="button" class="delete-btn btn btn-danger btn-sm">Delete</button>
          </td>
      `;

    // Add event listener for delete button
    const deleteButton = row.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => deleteUser(user.id));

    return row;
  };

  getUsers();
});
