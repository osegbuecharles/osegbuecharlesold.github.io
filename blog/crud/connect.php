<?php
//define('DB_SERVER', '127.0.0.1');
//define('DB_USERNAME', 'charles');
//define('DB_PASSWORD', 'ase2016_378002');
//define('DB_NAME', 'portfolio_blog');

define('DB_SERVER', 'localhost');
define('DB_NAME', 'osegbbml_osegbuecharles');
define('DB_USERNAME', 'osegbbml');
define('DB_PASSWORD', 'ebmUv6CO');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    echo("<script>alert('nolink');</script>");
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>