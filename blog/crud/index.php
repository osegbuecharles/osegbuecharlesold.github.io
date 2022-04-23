<?php
define('DB_SERVER', '127.0.0.1');
define('DB_USERNAME', 'charles');
define('DB_PASSWORD', 'ase2016_378002');
define('DB_NAME', 'auiaa');

//define('DB_SERVER', 'localhost');
//define('DB_NAME', 'hridnhwu_idealhr');
//define('DB_USERNAME', 'hridnhwu');
//define('DB_PASSWORD', 'ebmUv6CO');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    echo("<script>alert('nolink');</script>");
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>