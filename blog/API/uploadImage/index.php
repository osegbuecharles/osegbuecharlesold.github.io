
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>IdealHR Admin</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="">
  </head>
  <body>
    <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <div style="text-align: center;"><img src="../assets/preloader.gif" style="width:50%"></div>
    <script src="" async defer></script>
  </body>
</html>


<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
  if($_REQUEST && isset($_REQUEST["email"]) && isset($_REQUEST["password"])){
    include_once "../../crud/connect.php";

    $email = $_REQUEST["email"];
    $password = md5($_REQUEST["password"]);
        

    
      
        $uploadLogo= $_FILES["image"];


        
        
        $target_dir="../../uploads/images/";
        $target_file=$target_dir. basename($uploadLogo["name"]);

        $imageFileType= strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $companyLogo=date("YMd").date("hi")."_image.".$imageFileType;
    
        //Valid file extension
        $extensions_arr =array("jpg", "jpeg", "png", "gif");

        if( in_array($imageFileType,$extensions_arr)){

        

            $query1= "INSERT into `image` (`name`) VALUES ('$companyLogo');";
            //$query1= "INSERT INTO `users` (email,`password`,lastName,firstName,gender,dateCreated,timeCreated,lastSeen,verified,verifyToken) VALUES ('$email','$password','$lastName','$firstName','$gender','$date','$time','$date $time','false','$token');";
            $query3="SELECT * FROM `admin` WHERE email='$email'";
        
    
            $result=array();
            $result["error"]="FALSE";
            $result["data"]=array();
    
        
    
            if($result3=mysqli_query($link,$query3)){
                $row3=mysqli_fetch_array($result3,MYSQLI_ASSOC);
                if($password==$row3["password"]){
                   
                    if($result2=mysqli_query($link,$query1)){
                        move_uploaded_file($uploadLogo['tmp_name'],$target_dir.$companyLogo);
                        $result["error"]=FALSE;
                        $result["data"]=array(
                          "success"=>TRUE,
                        );
                        echo json_encode($result);
                       header("Location:https://osegbuecharles.com/blog/admin#images");
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

    
   
    
    
    

    
  }
  else{
    echo json_encode(array('error'=>TRUE,'message'=>'Not a POST request'));
  } 