<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: POST");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_REQUEST) && isset($_REQUEST["criteria"])){
        include "../../crud/connect.php";
        

        $criteria=$_REQUEST["criteria"];
        
        

        $resultarr=array();
        $resultarr["error"]="";
        $resultarr["length"]="";
        $resultarr["data"]=array();

        
            if($criteria=="all"){
                $pageNum=$_REQUEST["pageNum"];
                $pageSize=$_REQUEST["pageSize"];
                $offset=($pageNum-1)*$pageSize;
                $query= "SELECT * FROM `blog` ORDER BY `blogId` DESC LIMIT $pageSize OFFSET $offset;";
                $query2="SELECT COUNT(*) as 'length' FROM `blog`;";
            } 
            elseif($criteria=="id"){
                $val=$_REQUEST["value"];
                $query= "SELECT * FROM `blog` WHERE `blogId`='$val';";
                $query2="SELECT COUNT(*) as 'length' FROM `blog` WHERE `blogId`='$val';";
            }
        
        
            if($result=mysqli_query($link,$query)){
                $resultarr["error"]=FALSE;
                $resLen=mysqli_query($link,$query2);
                $rowLen=mysqli_fetch_array($resLen,MYSQLI_ASSOC);
                $resultarr["length"]=$rowLen["length"];
                while($row1=mysqli_fetch_array($result)){
                    extract($row1);        
                        $reply=array(
                            "blogId"=>$blogId,
                            "title"=>$title,
                            "body"=>$body,                            
                           "createdBy"=>$createdBy,
                           "dateCreated"=>$dateCreated,
                           "timeCreated"=>$timeCreated,                           
                        );                        
                        array_push($resultarr["data"],$reply);
        
                } 
                echo json_encode($resultarr);
            }
            else{
                echo json_encode(mysqli_error($link));
            }
    }
    else{
        echo json_encode(array('error'=>TRUE,'message'=>'Not a POST request'));
    }

?>