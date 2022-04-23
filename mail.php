<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: GET");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  if($_REQUEST && isset($_REQUEST["email"]) && isset($_REQUEST["name"])){    
    $email=$_REQUEST["email"];
    $name=$_REQUEST["name"];
    $phone=$_REQUEST["phone"];
    $subject=$_REQUEST["subject"];
    $msg=$_REQUEST["message"];


    
    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html; charset=iso-8859-1" . "\r\n";

    // More headers
    $headers .= 'From: <no-reply@osegbuecharles.com>' . "\r\n";
    $headers .= 'Cc: chukacj@hotmail.com' . "\r\n";

    $message="
        <html>
            <head>
                <title>Enquiry From $name</title>
            </head>
            <body>
                <div>
                    <h2>$subject</h2>
                    <br/>
                    <b>Email: </b><a href='mailto:$email'>$email</a>
                    <br/><br/>
                    
                    <b>Name: </b>$name
                    <br/><br/>
                    
                    <b>Phone: </b><a href='tel:$phone'>$phone</a>
                    <br/><br/>
                    
                    <b>Message:</b><br/>$msg
                    
                    
                
                </div>            
            </body>
        
        
        </html>

    ";


    $received="<html>
        <head>
            <title>Message Received</title>
        </head>
        <body>
            Your message has been received!
        </body>
    ";
    

    // the message
   // $mssg = "Name: $name \nPhone: $phone\nEmail: $email\nMessage: $msg";

    // use wordwrap() if lines are longer than 70 characters
   // $msg = wordwrap($msg,70);

    
    if(mail("osegbuecharles@gmail.com",$subject,$message,$headers)){
        echo json_encode(array("error"=>FALSE,"data"=>array("success"=>TRUE)));
        mail($email,"Message Received",$received,$headers);
    }
    else{
        echo json_encode(array("error"=>TRUE,"message"=>$error_message));
    }
  }
  else{
      echo json_encode(array("error"=>TRUE,"message"=>"Not a Post REQUEST"));
  }

?>