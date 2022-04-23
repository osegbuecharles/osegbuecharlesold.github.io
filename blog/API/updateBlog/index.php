<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
  if($_REQUEST && isset($_REQUEST["email"])){
    include_once "../../crud/connect.php";
    $email = $_REQUEST["email"];
    $password = md5($_REQUEST["password"]);
    
    $blogId = $_REQUEST["blogId"];
    $author = $_REQUEST["author"];
    $subject = $_REQUEST["subject"];
    $meta = $_REQUEST["meta"];
    $image=$_REQUEST["image"];
    $dateCreated=$_REQUEST["dateCreated"];
    $category=$_REQUEST["category"];
    $tags=$_REQUEST["tags"];
    $content=$_REQUEST["content"];

    
    
    $date=date("Y-M-d");
    $time=(intVal(date("h"))).date(":ia");

    
    
    $query1= "UPDATE `blog` SET blogId='$blogId', author='$author', `subject`='$subject', meta='$meta' , `image`='$image', dateCreated='$dateCreated', category='$category' , tags='$tags', content='$content' WHERE blogId='$blogId';";
    
    //$query1= "INSERT INTO `users` (email,`password`,lastName,firstName,gender,dateCreated,timeCreated,lastSeen,verified,verifyToken) VALUES ('$email','$password','$lastName','$firstName','$gender','$date','$time','$date $time','false','$token');";
    
    $query3="SELECT * FROM `admin` WHERE email='$email'";

    $result=array();
    $result["error"]="FALSE";
    $result["data"]=array();

    

        if($result3=mysqli_query($link,$query3)){
            $row3=mysqli_fetch_array($result3,MYSQLI_ASSOC);
            if($password==$row3["password"]){
                                
                if($result2=mysqli_query($link,$query1)){
                   
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
                echo json_encode(array('error'=>TRUE,'message'=>'It appears your credentials do not have authorisation to perform this operation!'));
            }
        }
        else{
            echo json_encode(array('error'=>TRUE,'message'=>'You are not authorised to perform this operation!'));
        }
    
  }
  else{
    echo json_encode(array('error'=>TRUE,'message'=>'Not a POST request'));
  } 