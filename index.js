

$(document).ready(async function(){

    $("#sendMessage").submit(async function(e){
        e.preventDefault();
        $(".loading").fadeIn(async function(){
          name=$("#name").val();
          email=$("#email").val();
          phone=$("#phone").val();
          subject=$("#subject").val();
          message=$("textarea[name=message]").val();

          
          data= await sendEnquiry(email,name,phone,subject,message);
          $(data).ready(function(){
            $(".loading").fadeOut(function(){
              $(".sent-message").fadeIn(function(){
                setInterval(sent,5000);
              });
            });
          });
        });
        
    });
});


function sent(){
  $(".sent-message").fadeOut();
}

function sendEnquiry(email,name,phone,subject,message){
    var settings = {
        "url": "https://osegbuecharles.com/mail.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "email": email,
          "phone": phone,
          "name":name,
          "subject":subject,
          "message":message
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
}