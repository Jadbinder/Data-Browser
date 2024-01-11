<?php
$servername = "localhost";
$username = "Jad";
$password = "hY8_2fzie*Mas:gr&}n0:@^";
$dbname = "mydb";

// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} 

// Create database
$sql = "CREATE DATABASE myDB";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully<br>";
} else {
    echo "Error creating database: " . $conn->error ."<br>";
}

$conn->close();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to create table
$sql = "CREATE TABLE Itemlist (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(60) NOT NULL,
iClass VARCHAR(60) NOT NULL,
cost VARCHAR(60) NOT NULL,
mythic VARCHAR(60) NOT NULL,
stat VARCHAR(60) NOT NULL,
image VARCHAR(60) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
  echo "Table Itemlist created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

// prepare and bind
$result = file_get_contents('items.json');
$myArr = json_decode($result);

$stmt = $conn->prepare("INSERT INTO Itemlist (name, iClass, cost, mythic, stat, image) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $name, $iClass, $cost, $mythic, $stat, $image);


for($i = 0; $i < sizeof($myArr); $i++){
	$name = $myArr[$i]->name;
	$iClass = $myArr[$i]->iClass;
	$cost = $myArr[$i]->cost;
	$mythic = $myArr[$i]->mythic;	
	$stat = $myArr[$i]->stat;
	$image = $myArr[$i]->Image;
	$stmt->execute();
}

$stmt->close();
$conn->close();
?> 