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


$count = $_GET['itemCount'];
$result = $_GET['sortM'];

if($result == "default"){
	$sql = "SELECT * FROM itemlist LIMIT $count, 1;";
	$result = $conn->query($sql);
	$item = $result->fetch_assoc();
	echo json_encode($item);
}

if($result == "alpha"){
	$sql = "SELECT * FROM itemlist ORDER BY name ASC LIMIT $count, 1;";
	$result = $conn->query($sql);
	$item = $result->fetch_assoc();
	echo json_encode($item);
}

?> 