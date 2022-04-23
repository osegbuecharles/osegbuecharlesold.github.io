<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8;");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  if($_REQUEST && isset($_REQUEST["email"]) && isset($_REQUEST["password"])){
    include_once "../../crud/connect.php";
    $email=$_REQUEST["email"];
    $password=md5($_REQUEST["password"]);
    $date=date("Y-M-d");
    $time=(intVal(date("h"))).date(":ia");

    $query="SELECT * FROM `admin` WHERE email='$email';";
    

    $result=array();
    $result["error"]=FALSE;
    $result["data"]=array();

    if($result1=mysqli_query($link,$query)){
        $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
        if($row!=null) {
          //code...

          if($password==$row["password"]){
              
              $result["data"]=array(
                  "success"=>TRUE,
                  "email"=>$row["email"],                  
              );
              
              echo json_encode($result);            
          }
          else{
            echo json_encode(array('error'=>TRUE,'message'=>"Incorrect Password!"));
          }
        } 
        else{
          //throw $th;
          echo json_encode(array('error'=>TRUE,'message'=>'Account does not exist!'));
        }
       
    }
    else{
       echo json_encode(array('error'=>TRUE,'message'=>'Could Not Connect'));
    }
  }
  else{
    echo json_encode(array('error'=>TRUE,'message'=>'Not a POST request'));
  }
?>