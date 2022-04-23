
<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: POST");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_REQUEST) && isset($_REQUEST["email"])){
        include "../../crud/connect.php";
        
        $email=$_REQUEST["email"];
        $password=md5($_REQUEST["password"]);
        $id=$_REQUEST["id"];
        
        $target_dir="../../uploads/images/";
        

        $resultarr=array();
        $resultarr["error"]="";
        $resultarr["data"]=array();

        $query= "DELETE FROM `image` WHERE id='$id';";

        $query2= "SELECT * FROM `image` WHERE id='$id';";

        $query1="SELECT email,`password` FROM `admin` WHERE email='$email';";
        
        
        if($result1=mysqli_query($link,$query1)){
            $row=mysqli_fetch_array($result1,MYSQLI_ASSOC);
            if($password==$row["password"]){
                if($result2=mysqli_query($link,$query2)){
                    $row2=mysqli_fetch_array($result2,MYSQLI_ASSOC);
                    $logo=$row2["name"];
                    if($result=mysqli_query($link,$query)){
                        unlink($target_dir.$logo);
                        $resultarr["error"]=FALSE;            
                        $resultarr["data"]=array(
                            "success"=>TRUE
                        );                                               
                        echo json_encode($resultarr);                                                
                    }
                    else{
                        //echo json_encode(mysqli_error($link));
                        echo json_encode(array('error'=>TRUE,'message'=>'Image does not exist!'));
                        
                    }
                }
            }
            else{
                echo json_encode(array('error'=>TRUE,'message'=>'You are not authenticated to perform this operation'));
            }

        }
        else{
            //echo json_encode(mysqli_error($link));
            echo json_encode(array('error'=>TRUE,'message'=>'User does not exist'));
        }
    }
    else{
        echo json_encode(array('error'=>TRUE,'message'=>'Not a POST request'));
    }

?>