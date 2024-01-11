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

// prepare and bind
$result = $_GET['insertItems'];
$items = json_decode($result);
$new_increment = $_GET['max'];

$sql = "INSERT INTO itemlist (name, iClass, cost, mythic, stat, image) VALUES ('$items->name', '$items->iClass', '$items->cost', '$items->mythic', '$items->stat', '$items->Image')";

if ($conn->query($sql) === TRUE) {
    $sql_increment = "ALTER TABLE itemlist AUTO_INCREMENT = $new_increment";
			if ($conn->query($sql_increment) === TRUE) {
				echo "Record inserted and IDs updated successfully";
			}
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?> 