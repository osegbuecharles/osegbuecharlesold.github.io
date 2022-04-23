<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: POST");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_REQUEST) && isset($_REQUEST["value"])){
        include "../../crud/connect.php";
        
        
        
        $val=$_REQUEST["value"];

        $resultarr=array();
        $resultarr["error"]="";
        
        $resultarr["data"]=array();

        
        
        
        $query="SELECT * FROM blog WHERE blogId='$val'";
               
                if($result=mysqli_query($link,$query)){
                    $resultarr["error"]=FALSE;                   
                   
                    $row=mysqli_fetch_array(mysqli_query($link,$query),MYSQLI_ASSOC);
                    $current_like=$row["views"];

                    $new_like=$current_like+1;
        
                    $query4="UPDATE blog SET views='$new_like' WHERE blogId='$val'";
                    
                    mysqli_query($link,$query4);
                    
                    echo json_encode(array('error'=>FALSE,'data'=>array('success'=>TRUE)));
                }
                else{
                    echo json_encode(mysqli_error($link));
                }
               
            
          

        
        
    }
    else{
        echo json_encode(array('error'=>TRUE,'message'=>'Not a POST request'));
    }

?>