<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $email = isset($_POST["email"]) ? $_POST["email"] : '';
    $username = isset($_POST["username"]) ? $_POST["username"] : '';
    $password = isset($_POST["password"]) ? $_POST["password"] : '';
    $userType = isset($_POST["userType"]) ? $_POST["userType"] : '';

    // Additional policies (checkboxes)
    $report = isset($_POST["report"]) ? 1 : 0;
    $addDetails = isset($_POST["addDetails"]) ? 1 : 0;
    $editDetails = isset($_POST["editDetails"]) ? 1 : 0;
    $addAccused = isset($_POST["addAccused"]) ? 1 : 0;
    $editAccused = isset($_POST["editAccused"]) ? 1 : 0;
    $addInvestigation = isset($_POST["addInvestigation"]) ? 1 : 0;

    // Debugging: Check if variables are set
    // var_dump($email, $username, $password, $userType, $report, $addDetails, $editDetails, $addAccused, $editAccused, $addInvestigation);

    // Perform validation and other necessary checks

    // Sample check for existing user
    $checkExistingUser = "SELECT * FROM users WHERE username = '$username'";
    $existingUserResult = $conn->query($checkExistingUser);

    if ($existingUserResult->num_rows > 0) {
        // User already exists
        echo json_encode(array("status" => "error", "message" => "Username already taken"));
    } else {
        // Insert new user into the database
        $insertUser = "INSERT INTO users (email, username, password, type, report, add_detaiuee, edit_detaiuee, add_accused, edit_accused, add_investigcvtion) VALUES ('$email', '$username', '$password', '$userType', $report, $addDetails, $editDetails, $addAccused, $editAccused, $addInvestigation)";
        
        if ($conn->query($insertUser) === TRUE) {
            // User registration successful
            echo json_encode(array("status" => "success", "message" => "User registration successful"));
        } else {
            // Error in database insertion
            echo json_encode(array("status" => "error", "message" => "Error creating user: " . $conn->error));
        }
    }
} else {
    // Invalid request method
    echo json_encode(array("status" => "error", "message" => "Invalid request method"));
}

$conn->close();
?>
