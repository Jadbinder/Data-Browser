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

$id_to_delete = $_GET['itemCount'];
$new_increment = $_GET['max'];

$sql_delete = "DELETE FROM itemlist WHERE id = $id_to_delete";

if ($conn->query($sql_delete) === TRUE) {
    $sql_update = "UPDATE itemlist SET id = id - 1 WHERE id > $id_to_delete";

    if ($conn->query($sql_update) === TRUE) {
        $sql_increment = "ALTER TABLE itemlist AUTO_INCREMENT = $new_increment";
			if ($conn->query($sql_increment) === TRUE) {
				echo "Record deleted and IDs updated successfully";
			}
    }
	else {
        echo "Error updating IDs: " . $conn->error;
    }
}
else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();

?>