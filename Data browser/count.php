<?php 
$servername = "localhost";
$username = "Jad";
$password = "hY8_2fzie*Mas:gr&}n0:@^";
$dbname = "mydb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$itemlist = "itemlist";

$sql = "SELECT COUNT(*) as count FROM $itemlist";
$result = $conn->query($sql);
$count = $result->fetch_assoc();
echo json_encode($count);

?> 