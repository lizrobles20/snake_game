<?php
$username="snakex";
$password="snakex";
$database="serpiente";
$mysqli = new mysqli("localhost", $username, $password, $database); 

$result = mysqli_query($mysqli, "SELECT * FROM puntuacion");

$data = array();
while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data);
