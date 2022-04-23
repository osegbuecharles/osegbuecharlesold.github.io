<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
  if($_REQUEST && isset($_REQUEST["name"]) ){
    include_once "../../crud/connect.php";

    $name = $_REQUEST["name"];
    $comment= $_REQUEST["comment"];
    $blogId= $_REQUEST["blogId"];

    
    
    
    $date=date("Y-M-d");
    $time=(intVal(date("h"))).date(":ia");

    
    $query1= "INSERT INTO `blogcomments` (`name`,comment,blogId,dateCreated,timeCreated) VALUES ('$name','$comment','$blogId','$date','$time');";
    //$query1= "INSERT INTO `users` (email,`password`,lastName,firstName,gender,dateCreated,timeCreated,lastSeen,verified,verifyToken) VALUES ('$email','$password','$lastName','$firstName','$gender','$date','$time','$date $time','false','$token');";
    
    $query2="SELECT * FROM blog WHERE blogId='$blogId'";

    $result=array();
    $result["error"]="FALSE";
    $result["data"]=array();

 
       
          if($result2=mysqli_query($link,$query1)){
          
            $row2=mysqli_fetch_array(mysqli_query($link,$query2),MYSQLI_ASSOC);

            $current_comment=$row2["comments"];

            $new_comment=$current_comment+1;

            $query3="UPDATE blog SET comments='$new_comment' WHERE blogId='$blogId'";
            
            mysqli_query($link,$query3);
            
            $result["error"]=FALSE;
            $result["data"]=array(
              "success"=>TRUE,
            );
            echo json_encode($result);
          }
          else{
            echo json_encode(mysqli_error($link));
          }
        
    
  }
  else{
    echo json_encode(array('error'=>TRUE,'message'=>'Not a POST request'));
  } 