<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
    die("Unauthorized Access");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $equipId = trim($_POST['equipId']);
    $resourceName = trim($_POST['resourceName']);
    $category = trim($_POST['category']);
    $department = trim($_POST['department']); // Catching the new Department field

    try {
        // Assuming your DB column is still named 'location' based on your edit_process file
        $stmt = $pdo->prepare("INSERT INTO assets (equipment_id, resource_name, category, department, status) VALUES (?, ?, ?, ?, 'Available')");
        $stmt->execute([$equipId, $resourceName, $category, $department]);
        header("Location: assets.php");
        exit;
    } catch(PDOException $e) {
        die("Error adding asset (ID might already exist): " . $e->getMessage());
    }
}
?>