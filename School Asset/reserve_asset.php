<?php
session_start();
require 'db.php';

// Ensure only logged-in Staff/Faculty can reserve items
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Staff') {
    die("Unauthorized Access");
}

// Check if BOTH the ID and the new Location parameter were sent
if (isset($_GET['id']) && isset($_GET['location'])) {
    $equipId = $_GET['id'];
    $location = trim($_GET['location']); // Get the location they typed in
    $userName = $_SESSION['full_name'];

    try {
        // Update the asset: assign to the user, change status, AND update the location
        $stmt = $pdo->prepare("UPDATE assets SET status = 'Reserved', assigned_to = ?, location = ? WHERE equipment_id = ? AND status = 'Available'");
        $stmt->execute([$userName, $location, $equipId]);
        
    } catch(PDOException $e) {
        die("Error reserving asset: " . $e->getMessage());
    }
}

// Send them back to their dashboard
header("Location: faculty-dashboard.php");
exit;
?>