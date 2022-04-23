<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: POST");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_REQUEST) ){
        include "../../crud/connect.php";
        
        mysqli_set_charset($link, "utf8");
       
        //$val=$_REQUEST["value"];
        

        $resultarr=array();
        $resultarr["error"]="";
        $resultarr["length"]="";
        $resultarr["data"]=array();
        

       
        
        
     
        
            
            $query= "SELECT * FROM `image` ORDER BY id DESC;";
            $query2="SELECT COUNT(*) as 'length' FROM `image`;";
        
     


                
                if($result=mysqli_query($link,$query)){
                    $resultarr["error"]=FALSE;
                    $resultarr["length"]=0;      
                    $resLen=mysqli_query($link,$query2);
                    $rowLen=mysqli_fetch_array($resLen,MYSQLI_ASSOC);
                    $resultarr["length"]=$rowLen["length"];              
                    while($row1=mysqli_fetch_array($result)){
                        extract($row1);                                                             
                        $e="https://hrideal.com/osegbuecharles/uploads/images/".$name;
                        
                        //$e="../uploads/images/".$name;
                        array_push($resultarr["data"],array("id"=>$id,"name"=>$e));
                        
                        
            
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


   