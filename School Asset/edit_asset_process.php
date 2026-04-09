<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
    die("Unauthorized Access");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $equipId = $_POST['equipId']; 
    $resourceName = trim($_POST['resourceName']);
    $category = trim($_POST['category']);
    $status = trim($_POST['status']);
    $department = trim($_POST['department']); // Assuming you added a department field in the form

    try {
        $stmt = $pdo->prepare("UPDATE assets SET resource_name = ?, category = ?, status = ?, department = ? WHERE equipment_id = ?");
        $stmt->execute([$resourceName, $category, $status, $department, $equipId]);
        header("Location: assets.php");
        exit;
    } catch(PDOException $e) {
        die("Error updating asset: " . $e->getMessage());
    }
}
?>