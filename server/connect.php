<?php
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "user_exmaple_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
