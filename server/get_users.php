<?php
include 'connect.php';

// Fetch user data from the database
$query = "SELECT * FROM users";
$result = $conn->query($query);

// Check if there are rows in the result
if ($result->num_rows > 0) {
    $users = array();

    // Fetch associative array of users
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    // Return JSON response
    echo json_encode(array("status" => "success", "users" => $users));
} else {
    // No users found
    echo json_encode(array("status" => "error", "message" => "No users found"));
}

$conn->close();
?>
