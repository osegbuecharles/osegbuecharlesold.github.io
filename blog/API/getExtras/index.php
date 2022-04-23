<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: POST");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    
    if(isset($_REQUEST) && isset($_REQUEST["criteria"])){
        include "../../crud/connect.php";
        
        mysqli_set_charset($link, "utf8");
        $criteria=$_REQUEST["criteria"];
        //$val=$_REQUEST["value"];
        

        $resultarr=array();
        $resultarr["error"]="";
        $resultarr["length"]="";
        $resultarr["data"]=array();
        $resultarr["count"]=array();

       
        
        
     
        if($criteria=="tag"){
            
            $query= "SELECT `tags` FROM `blog` ORDER BY `blogId` DESC;";
           
        }
        elseif($criteria=="category"){
            
            $query= "SELECT `category` FROM `blog` ORDER BY `category` ASC;";
           
        }
     


                
                if($result=mysqli_query($link,$query)){
                    $resultarr["error"]=FALSE;
                    $resultarr["length"]=0;                    
                    while($row1=mysqli_fetch_array($result)){
                        extract($row1);                                                             
                        if($criteria=="tag"){
                            if(strpos($tags, ",")!=false){
                                $r=cleanTag($tags);
                                
                                for($i=0;$i<count($r);$i++){
                                    if(!in_array($r[$i],$resultarr["data"])){
                                        array_push($resultarr["data"],$r[$i]); 
                                        $resultarr["length"]=$resultarr["length"]+1;
                                    }    
                                }
                            }
                            else{
                                if(!in_array($tags,$resultarr["data"])){
                                    array_push($resultarr["data"],$tags); 
                                    $resultarr["length"]=$resultarr["length"]+1;
                                }  
                                  
                            }
                        }
                        else{
                            if(!in_array($category,$resultarr["data"])){
                                array_push($resultarr["data"],$category); 
                                $resultarr["length"]=$resultarr["length"]+1;
                                $resultarr["count"][$category]=1;
                            }
                            else{
                                 
                                
                                    $resultarr["count"][$category]=((int) $resultarr["count"][$category])+1;
                                
                                
                            }
                            
                            
                        }
                        
                        
            
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


    function cleanTag($n){
        $res=array();
        $temp="";
        
        for($u=0;$u<strlen($n);$u++){     
//         echo    substr($n,$u,1)."\n";
            if(substr($n,$u,1)==","){
                array_push($res,$temp);
                $temp="";
            }
            else{
                //echo $temp;
                $temp=$temp.substr($n,$u,1);
            }
        }
        array_push($res,$temp);
        //echo json_encode($res);
        return $res;
    }
    
?>