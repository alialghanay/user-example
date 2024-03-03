<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = isset($_POST["userId"]) ? $_POST["userId"] : '';

    // Perform validation if needed

    $deleteUser = "DELETE FROM users WHERE id = $userId";

    if ($conn->query($deleteUser) === TRUE) {
        echo json_encode(array("status" => "success", "message" => "User deleted successfully"));
    } else {
        echo json_encode(array("status" => "error", "message" => "Error deleting user: " . $conn->error));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method"));
}

$conn->close();
?>
