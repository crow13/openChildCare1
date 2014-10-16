<?php
$conn = mysqli_connect('localhost', 'root', '','csv_db');
if (!$conn) {
    die('Could not connect: ' . mysqli_error());
}

?>