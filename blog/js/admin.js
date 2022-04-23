//const  shareurl  = "http://127.0.0.1/idealhr/";
//const  shareurl  = "https://hrideal.com";

$(document).ready(async function(){

    $("#editBlogButton").click(function(){
        $("#createBlog").hide(function(){
            $("#deleteBlog").hide(function(){
                $("#editBlog").show();
            });
        });
   });

   $("#createBlogButton").click(function(){
       $("#editBlog").hide(function(){
           $("#deleteBlog").hide(function(){
            $("#createBlog").show();
           });
       });
   });
    
   $("#deleteBlogButton").click(function(){
        $("#editBlog").hide(function(){
            $("#createBlog").hide(function(){
                $("#deleteBlog").show();
            });
        }); 
    });

    //Checking if admin is logged in
    logged=sessionStorage.getItem("logged");
    

    if (logged!="true"){
        $("#login").fadeIn();
    }
    else{
        $("#main").show();
        
       
       
       
        loadImageList();
    }

    $("#logoutbtn").click(function(){
        sessionStorage.clear();
        window.location.replace("../admin");

    });

    //login form submitted
    $("#loginform").submit(async function(e){
        e.preventDefault();
        email= $("#loginemail").val();
        password=$("#loginpsw").val();
        document.getElementById("showModal").click();
        login(email,password)
    });


    $("#blogForm").submit(async function(e){
        e.preventDefault();

        $("#blogLoading").fadeIn();
        $("#blogError").fadeOut();
        $("#blogSent").fadeOut();
        
    

    author=$("#author").val();
    subject=$("#subject").val();
    image=$("#image").val();
    category=$("#category").val();
    tags=$("#tags").val();
    dateCreated=$("#dateCreated").val();
    meta=CKEDITOR.instances.meta.getData();
    content=CKEDITOR.instances.content.getData();

    if(meta==""){
        meta=" ";
    }
    
    

    datacon= await createBlogApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),author,subject,meta,image,dateCreated,category,tags,content);


    $(datacon).ready(function(){
        if(datacon.error==false){
            $("#blogLoading").fadeOut(function(){                   
                $("#blogSent").fadeIn();
            });
        }
        else{
            $("#blogLoading").fadeOut(function(){
                $("#blogError").html(datacon.message);
                $("#blogError").fadeIn();
            });
        }
    });

});


$("#editBlogId").submit(async function(e){
    e.preventDefault();

    id=$("#loadBlogId").val();
    
    blogData= await searchBlogInfoApi("id",id);

    $(blogData).ready(function(){

        if(blogData.data[0]!=undefined){
            sessionStorage.setItem("updateBlogId",id);
            re=blogData.data[0];
            $("#authorUpdate").val(re.author);
            $("#subjectUpdate").val(re.subject);
            $("#imageUpdate").val(re.image);
            CKEDITOR.instances.metaUpdate.setData(re.meta);
            $("#dateCreatedUpdate").val(re.dateCreated);
            $("#categoryUpdate").val(re.category);
            $("#tagsUpdate").val(re.tags);
            CKEDITOR.instances.contentUpdate.setData(re.content);
            document.getElementById("updateBlogButton").disabled=false;
        }
        else{
            document.getElementById("updateBlogButton").disabled=true;
            sessionStorage.removeItem("updateBlogId");
            alert("Invalid Blog ID");
        }
    });

    $("#blogFormUpdate").submit(async function(e){
        e.preventDefault();

        $("#blogLoadingUpdate").fadeIn();
        $("#blogErrorUpdate").fadeOut();
        $("#blogSentUpdate").fadeOut();
        
    

        blogId=sessionStorage.getItem("updateBlogId")
    authorUpdate=$("#authorUpdate").val();
    subjectUpdate=$("#subjectUpdate").val();
    imageUpdate=$("#imageUpdate").val();
    categoryUpdate=$("#categoryUpdate").val();
    tagsUpdate=$("#tagsUpdate").val();
    dateCreatedUpdate=$("#dateCreatedUpdate").val();
    metaUpdate=CKEDITOR.instances.metaUpdate.getData();
    contentUpdate=CKEDITOR.instances.contentUpdate.getData();

   
    if(metaUpdate==""){
        metaUpdate=" ";
    }
    

    dataconUpdate= await updateBlogApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),blogId,authorUpdate,subjectUpdate,metaUpdate,imageUpdate,dateCreatedUpdate,categoryUpdate,tagsUpdate,contentUpdate);


    $(dataconUpdate).ready(function(){
        if(dataconUpdate.error==false){
            $("#blogLoadingUpdate").fadeOut(function(){                   
                $("#blogSentUpdate").fadeIn();
            });
        }
        else{
            $("#blogLoadingUpdate").fadeOut(function(){
                $("#blogErrorUpdate").html(dataconUpdate.message);
                $("#blogErrorUpdate").fadeIn();
            });
        }
    });

});
});



$("#deleteBlogId").submit(async function(e){
    e.preventDefault();

    id=$("#loadBlogId1").val();
    
    blogData= await searchBlogInfoApi("id",id);

    $(blogData).ready(function(){

        if(blogData.data[0]!=undefined){
            sessionStorage.setItem("deleteBlogId",id);
            re=blogData.data[0];
            $("#authorDelete").val(re.author);
            $("#subjectDelete").val(re.subject);
            $("#imageDelete").val(re.image);
            CKEDITOR.instances.metaDelete.setData(re.meta);
            $("#dateCreatedDelete").val(re.dateCreated);
            $("#categoryDelete").val(re.category);
            $("#tagsDelete").val(re.tags);
            CKEDITOR.instances.contentDelete.setData(re.content);
            document.getElementById("deleteBlogButton1").disabled=false;
        }
        else{
            document.getElementById("deleteBlogButton1").disabled=true;
            sessionStorage.removeItem("deleteBlogId");
            alert("Invalid Blog ID");
        }
    });

    $("#blogFormDelete").submit(async function(e){
        e.preventDefault();

        $("#blogLoadingDelete").fadeIn();
        $("#blogErrorDelete").fadeOut();
        $("#blogSentDelete").fadeOut();
        
    

        blogId=sessionStorage.getItem("deleteBlogId")
  

   
    
    

    dataconDelete= await deleteBlogApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),blogId);


    $(dataconDelete).ready(function(){
        if(dataconDelete.error==false){
            $("#blogLoadingDelete").fadeOut(function(){                   
                $("#blogSentDelete").fadeIn();
            });
        }
        else{
            $("#blogLoadingDelete").fadeOut(function(){
                $("#blogErrorDelete").html(dataconDelete.message);
                $("#blogErrorDelete").fadeIn();
            });
        }
    });

});
});


    $("#uploadImg").click(function(){
        $(".modal-body").html(`
        <div>
            <div style="text-align: center;">
                <form action="`+apiurl+`uploadImage/index.php" method="post" enctype="multipart/form-data"> 
                <input type="text" name="email" placeholder="email" value="`+sessionStorage.getItem("email")+`" style="display:none">
                <input type="text" name="password" placeholder="password" value="`+sessionStorage.getItem("password")+`" style="display:none">
                    <h3>Select Image</h3>
                    <input class="form-control" name="image" type="file" accept="image/jpg, image/png, image/jpeg, image/gif" required/>
                
                    <button type="submit" class="btn btn-success mt-2" >Submit</button>
                </form>
            
            </div>
        </div>
    `);
    $(".modal-header").html(`<h1>Upload Image</h1>`);
    document.getElementById("showModal").click();
    });

    


});


async function loadImageList(){
    dataI= await getImageApi();
    $(dataI).ready(function(){
        if(dataI.data.length<1){
            $("#imageList").html(`
                <h3 style="text-align:center;" class="text-danger">You have not uploaded any images!</h3>
            `);
        }
        else{
            for(u=0;u<dataI.data.length;u++){
                $("#imageList").append(`
                <div class="container-fluid pt-0">
                <hr>
                <div class="card mt-0 ">
               
                    <div class="card-body">
                        <img class="imgThumbnail" src="`+dataI.data[u].name+`"/> <a class="text-primary" href="`+dataI.data[u].name+`"> `+dataI.data[u].name+`</a>
                    </div>  
                    
                    <div class="card-footer">
                        <button class="btn btn-danger" onclick="deleteImage('`+dataI.data[u].id+`')"><i class="fa fa-trash"></i></button>
                    </div>
              </div>
            </div>
                
                `);
            }
        }
    });
}

async function deleteImage(id){
    ds= await deleteImageApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),id);
    $(ds).ready(async function(){
        
    if(ds.error==false){
        
       await loadImageList();
        
    }
    else{
        alert("Couldnt Delete!");
    }
    });
}

async function login(email, password){
    
    $(".modal-body").html(`
        <div>
            <div style="text-align: center;"><img src="../../assets/preloader.gif" style="width:10%"></div>
        </div>
    `);
    $(".modal-header").html(`<h1>Login Status</h1>`);

    var data= await loginApi(email,password);
    //console.log(data);
    $(data).ready(function(){
        if(data.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data["message"]+`!
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
                `);        
        }
        else if(data.error==false){
            //Save all user basic information
            sessionStorage.setItem("logged",true);
            sessionStorage.setItem("email",email);
            sessionStorage.setItem("password",password);            
            
            //call up to modal to signify success to the user
            $(".modal-body").html(`
                <p class="force text-white">
                    You have successfully logged in!
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-success message_close" >Continue</button>
                `);
                $(".message_close").click(async function(){
                    window.location.replace("../admin");
                });

                setInterval(refresh,1000);
        }
    });
}


function refresh(){
    window.location.replace("../admin");
}

async function sync(){
     //Getting all site settings
     var emailData=await getSettingsApi("email");
     var email= emailData.data.value;

     var emailData2=await getSettingsApi("email2");
     var email2= emailData2.data.value;
 
     var phone1Data=await getSettingsApi("phone1");
     var phone1= phone1Data.data.value;
 
     var phone2Data=await getSettingsApi("phone2");
     var phone2= phone2Data.data.value;
 
     var twitterData=await getSettingsApi("twitter");
     var twitter= twitterData.data.value;
 
     var facebookData= await getSettingsApi("facebook");
     var facebook= facebookData.data.value;
 
     var instagramData= await getSettingsApi("instagram");
     var instagram= instagramData.data.value;
 
     var addressData= await getSettingsApi("address");
     var address= addressData.data.value;
 
     var linkedinData=await getSettingsApi("linkedin");
     var linkedin= linkedinData.data.value;

     $("#email").html(`
     <a href="mailto:`+email+`">`+email+`</a>
 `);

 $("#phone").html(`
     <a href='tel: `+phone1+`'>`+phone1+`</a> , <a href="tel: `+phone2+` ">`+phone2+`</a>
 `);

 $(".twitter").html(`
     <a href="`+twitter+`" class="twitter" target="_blank"><i class="fa fa-twitter" ></i></a>
 `);
 
 $(".facebook").html(`
 <a href="`+facebook+`" class="facebook"><i class="fa fa-facebook"></i></a>
 `);
 
 $(".instagram").html(`
     <a href="`+instagram+`" class="instagram"><i class="fa fa-instagram"></i></a>
 `);


 $(".linkedin").html(`
     <a href="`+linkedin+`" class="linkedin"><i class="fa fa-linkedin"></i></a>
 `);

 $(".whatsapp").html(`
        <a data-toggle="tooltip" data-placement="top" title="Send us a message" href="https://wa.me/`+phone1+`" target="_blank">
            <i class="fa fa-whatsapp"></i>
        </a>
    `)
    $("#email2").html(`
    <a href="mailto:`+email2+`">`+email2+`</a>
`);
    
    
    if(gender=="male"){
        $("#welcomeName").html(`
            Mr. `+firstName+`!
        `);
    }
    else if(gender=="female"){
        $("#welcomeName").html(`
            Mrs. `+firstName+`!
        `);
    }

    $(".lastSeen").html(lastSeen);
    $(".dateCreated").html(dateCreated);
    $("#profileLastName").val(lastName);
    $("#profileFirstName").val(firstName);

    $("#siteEmail").val(email);
    $("#siteEmail2").val(email2);
    $("#siteAddress").val(address);
    $("#sitePhone1").val(phone1);
    $("#sitePhone2").val(phone2);
    $("#siteFacebook").val(facebook);
    $("#siteInstagram").val(instagram);
    $("#siteTwitter").val(twitter);
    $("#siteLinkedin").val(linkedin);

    $("#detailEmail").html(`
        Last modified by `+emailData.data.modifiedBy+` on `+emailData.data.lastModified+`
    `);
    

    $("#detailEmail2").html(`
        Last modified by `+emailData2.data.modifiedBy+` on `+emailData2.data.lastModified+`
    `);

    $("#detailAddress").html(`
        Last modified by `+addressData.data.modifiedBy+` on `+addressData.data.lastModified+`
    `);

    $("#detailPhone1").html(`
        Last modified by `+phone1Data.data.modifiedBy+` on `+phone1Data.data.lastModified+`
    `);

    $("#detailPhone2").html(`
        Last modified by `+phone2Data.data.modifiedBy+` on `+phone2Data.data.lastModified+`
    `);

    $("#detailFacebook").html(`
        Last modified by `+facebookData.data.modifiedBy+` on `+facebookData.data.lastModified+`
    `);

    $("#detailInstagram").html(`
        Last modified by `+instagramData.data.modifiedBy+` on `+instagramData.data.lastModified+`
    `);

    $("#detailTwitter").html(`
        Last modified by `+twitterData.data.modifiedBy+` on `+twitterData.data.lastModified+`
    `);
    
    $("#detailLinkedin").html(`
        Last modified by `+linkedinData.data.modifiedBy+` on `+linkedinData.data.lastModified+`
    `);
    loadPosts(1);
    loadEnquiries(1);

}

async function updateProfile(lastName,firstName){
    $(".modal-body").html(`
        <div>
            <div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>
        </div>
    `);
    $(".modal-header").html(`<h1>Updating Profile...</h1>`);
    //console.log("seen");
    var data= await editAdminApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),lastName,firstName);
    //console.log("seen2")
    //console.log(data);
    $(data).ready(function(){
        if(data.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data["message"]+`!
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
                `);        
        }
        else if(data.error==false){
            sessionStorage.setItem("lastName",lastName);
            sessionStorage.setItem("firstName",firstName);
            sync();
            //call up to modal to signify success to the user
            $(".modal-body").html(`
                <p class="force text-white">
                    Account Details has been updated successfully!
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-success" data-dismiss="modal" >Continue</button>
                `);
        }
    });
}

async function changePassword(oldPassword,newPassword){
    $(".modal-body").html(`
    <div>
    <div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>
    </div>
    `);
    $(".modal-header").html(`<h1>Changing Password...</h1>`);
    //console.log("seen");
    var data= await changePasswordApi(sessionStorage.getItem("email"),oldPassword,newPassword);
    //console.log(oldPassword)
    //console.log(newPassword);
    $(data).ready(function(){
        if(data.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data["message"]+`!
                </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);        
    }
    else if(data.error==false){
        sessionStorage.setItem("password",newPassword);
        //call up to modal to signify success to the user
        $(".modal-body").html(`
            <p class="force text-white">
                Your password has been changed!
            </p>
            `);
            $(".modal-footer").html(`
            <button type="button" class="btn btn-success message_close" >Continue</button>
        `);
        $(".message_close").click(async function(){
            window.location.replace("../user");
        });

        setInterval(refresh,1000);
    }
});
}

async function updateSettings(email,email2,address,phone1,phone2,facebook,instagram,twitter,linkedin){
    $(".modal-body").html(`
    <div>
        <div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>
    </div>
    `);
    $(".modal-header").html(`<h1>Updating Settings...</h1>`);
    //console.log("seen");
    
    var data1= await editSettingsApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"email",email);
    var data12= await editSettingsApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"email2",email2);
    var data2= await editSettingsApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"address",address);
    var data3= await editSettingsApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"phone1",phone1);
    var data4= await editSettingsApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"phone2",phone2);
    var data5= await editSettingsApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"facebook",facebook);
    var data6= await editSettingsApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"instagram",instagram);
    var data7= await editSettingsApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"twitter",twitter);
    var data8= await editSettingsApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"linkedin",linkedin);
    //console.log(oldPassword)
    //console.log(newPassword);
    $(data8).ready(function(){
        if(data1.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data1["message"]+`!
                </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);        
        }
        if(data12.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data12["message"]+`!
                </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);        
        }
        else if(data2.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data2["message"]+`!
                </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);        
        }       
        else if(data3.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data3["message"]+`!
                </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);        
        }
        else if(data4.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data4["message"]+`!
                </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);        
        }
        else if(data5.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data5["message"]+`!
                </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);        
        }
        else if(data6.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data6["message"]+`!
                </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);        
        }
        else if(data7.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data7["message"]+`!
                </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);        
        }
        else if(data8.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data8["message"]+`!
                </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
            `);        
        }
    else{
        sync();
        //call up to modal to signify success to the user
        $(".modal-body").html(`
            <p class="force text-white">
                Site Settings Updated
            </p>
            `);
            $(".modal-footer").html(`
            <button type="button" data-dismiss="modal" class="btn btn-success message_close" >Continue</button>
        `);
        

        
    }
});
}


async function createAdmin(email,password,lastName,firstName,gender){
    $(".modal-body").html(`
        <div>
            <div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>
        </div>
    `);
    $(".modal-header").html(`<h1>Creating Admin...</h1>`);
    //console.log("seen");
    var data= await createAdminApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),email,password,lastName,firstName,gender);
    //console.log("seen2")
    //console.log(data);
    $(data).ready(function(){
        if(data.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data["message"]+`!
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
                `);        
        }
        else if(data.error==false){           
        
            //call up to modal to signify success to the user
            $(".modal-body").html(`
                <p class="force text-white">
                    Admin Account has been created successfully!
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-success" data-dismiss="modal" >Continue</button>
                `);
        }
    });
}


async function loadEnquiries(pageNum){

    pageSize=5;
    email=sessionStorage.getItem("email");
    password=sessionStorage.getItem("password");
   
    $("#enquiries").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
    $("#paginationEnquiry").html(``);
    sessionStorage.setItem("pageNumEnquiry",pageNum);

    data= await getAllEnquiryApi(email,password,pageNum,pageSize);

    $(data).ready(function(){
        
        if(data.error==true){
            
            $("#enquiries").html(`
                    <div class="error_message">Could not load Enquiries, Contact Admin!</div>
            `);
            $("#paginationEnquiry").html(``);
        }
        else if(data.error==false){
            $("#paginationEnquiry").html(``);
            
            if(data.length<1){
                $("#enquiries").html(`
                    <div class="empty_message">There are no enquiries!</div>
                `);
            }
            else{
                $("#enquiries").html(``);
                $("#enquiries").append(`
                    <div class="container enquiry_date">`+data.data[0].dateCreated+`</div>
                `);
                $("#enquiries").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header">
                                    `+data.data[0].lastName+`&nbsp`+data.data[0].firstName+`
                                    <div style="float:right">`+data.data[0].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    `+data.data[0].message+`
                                </div>
                                <div class="card-footer">                                                                        
                                    <a class="btn btn-primary" href="mailto:`+data.data[0].email+`"><i class="fa fa-envelope"></i></a>                                    
                                    <a class="btn btn-primary" href="tel:`+data.data[0].phone+`"><i class="fa fa-phone"></i></a>
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+data.data[0].phone+`" target="_blank">
                                      <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                                    </a>
                                    <button class="btn btn-danger" onclick="deleteEnquiry('`+data.data[0].enquiryId+`')"><i class="fa fa-trash"></i></button>
                                </div>
                          </div>
                        </div>
                    
                    `);
                if(data.data.length>1){
                    for(i=1;i<data.data.length;i++){                    
                    
                        if(data.data[i].dateCreated!=data.data[i-1].dateCreated){
                            $("#enquiries").append(`
                                <div class="container enquiry_date mt-3">`+data.data[i].dateCreated+`</div>
                            `);
                        }
                        $("#enquiries").append(`
                            
                            <div class="container-fluid pt-0">
                                <hr>
                                <div class="card mt-0 ">
                                    <div class="card-header">
                                        `+data.data[i].lastName+`&nbsp`+data.data[i].firstName+`
                                        <div style="float:right">`+data.data[i].timeCreated+`</div>
                                    </div>
                                    <div class="card-body">
                                        `+data.data[i].message+`
                                    </div>
                                    <div class="card-footer">
                                        <a class="btn btn-primary" href="mailto:`+data.data[i].email+`"><i class="fa fa-envelope"></i></a>                                    
                                        <a class="btn btn-primary" href="tel:`+data.data[i].phone+`"><i class="fa fa-phone"></i></a>
                                        <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+data.data[i].phone+`" target="_blank">
                                            <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                                        </a>
                                        <button class="btn btn-danger" onclick="deleteEnquiry('`+data.data[i].enquiryId+`')"><i class="fa fa-trash"></i></button>
                                    </div>
                              </div>
                            </div>
                        
                        `);
                    }
                }
            }
            var pgLen=Math.ceil(data.length/pageSize);
            loadPaginationEnquiry(pageNum,pgLen);
        }
    });
}

async function loadClients(pageNum){

    pageSize=5;
    email=sessionStorage.getItem("email");
    password=sessionStorage.getItem("password");
   
    $("#clients").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
    $("#paginationClient").html(``);
    sessionStorage.setItem("pageNumClient",pageNum);

    datacl= await getClientApi(email,password,pageNum,pageSize);

    $(datacl).ready(function(){
        
        if(datacl.error==true){
            
            $("#clients").html(`
                    <div class="error_message">Could not load clients, Contact Admin!</div>
            `);
            $("#paginationClient").html(``);
        }
        else if(datacl.error==false){
            $("#paginationClient").html(``);
            
            if(datacl.length<1){
                $("#clients").html(`
                    <div class="empty_message">There are no clients!</div>
                `);
            }
            else{
                $("#clients").html(``);
                $("#clients").append(`
                    <div class="container enquiry_date">`+datacl.data[0].dateCreated+`</div>
                `);
                $("#clients").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header">
                                    `+datacl.data[0].name+`
                                    <div style="float:right">`+datacl.data[0].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    `+datacl.data[0].comment+`
                                </div>
                                <div class="card-footer">                                                                        
                                    <a class="btn btn-primary" href="mailto:`+datacl.data[0].email+`"><i class="fa fa-envelope"></i></a>                                    
                                    <a class="btn btn-primary" href="tel:`+datacl.data[0].phone+`"><i class="fa fa-phone"></i></a>
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+datacl.data[0].phone+`" target="_blank">
                                      <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                                    </a>
                                    <button class="btn btn-danger" onclick="deleteClient('`+datacl.data[0].clientId+`','`+datacl.data[0].form+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;|&nbsp;&nbsp;
                                    <a class="btn btn-primary" href="`+datacl.data[0].form+`">Download Form</a>
                                </div>
                          </div>
                        </div>
                    
                    `);
                if(datacl.data.length>1){
                    for(i=1;i<datacl.data.length;i++){                    
                    
                        if(datacl.data[i].dateCreated!=datacl.data[i-1].dateCreated){
                            $("#clients").append(`
                                <div class="container enquiry_date mt-3">`+datacl.data[i].dateCreated+`</div>
                            `);
                        }
                        $("#clients").append(`
                         <div class="container-fluid pt-0">
                         <hr>
                            <div class="card mt-0 ">
                            <div class="card-header">
                                `+datacl.data[i].name+`
                                <div style="float:right">`+datacl.data[i].timeCreated+`</div>
                            </div>
                            <div class="card-body">
                                `+datacl.data[i].comment+`
                            </div>
                            <div class="card-footer">                                                                        
                                <a class="btn btn-primary" href="mailto:`+datacl.data[i].email+`"><i class="fa fa-envelope"></i></a>                                    
                                <a class="btn btn-primary" href="tel:`+datacl.data[i].phone+`"><i class="fa fa-phone"></i></a>
                                <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+datacl.data[i].phone+`" target="_blank">
                                  <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                                </a>
                                <button class="btn btn-danger" onclick="deleteClient('`+datacl.data[i].clientId+`','`+datacl.data[i].form+`')"><i class="fa fa-trash"></i></button>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a class="btn btn-primary" href="`+datacl.data[i].form+`">Download Form</a>
                            </div>
                      </div>
                    </div>
                        
                        `);
                    }
                }
            }
            var pgLen=Math.ceil(datacl.length/pageSize);
            loadPaginationClient(pageNum,pgLen);
        }
    });
}


async function loadPaginationEnquiry( pageNum, pgLen){
    if(pgLen>1){
        if(pageNum==1){
            $("#paginationEnquiry").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgEnquiry" class="page-item disabled">
                            <a class="page-link" tabindex="-1">Previous</a>
                        </li>
                
                
                        <li class="page-item">
                            <a class="page-link" onclick="loadEnquiries('`+(parseInt(pageNum)+1)+`')">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        else if(pageNum==pgLen){
            $("#paginationEnquiry").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgEnquiry" class="page-item">
                            <a class="page-link" onclick="loadEnquiries('`+(parseInt(pageNum)-1)+`')">Previous</a>
                        </li>
                
                
                        <li class="page-item disabled">
                            <a class="page-link" tabindex="-1">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        else{
            $("#paginationEnquiry").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgEnquiry" class="page-item">
                            <a class="page-link" onclick="loadEnquiries('`+(parseInt(pageNum)-1)+`')">Previous</a>
                        </li>
                
                
                        <li class="page-item">
                            <a class="page-link" onclick="loadEnquiries('`+( parseInt(pageNum) +1)+`')">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        for(j=pgLen;j>=1;j--){
            if(j==pageNum){
                $("#prevPgEnquiry").after(`
                    <li class="page-item active">
                        <a class="page-link">`+j+`<span class="sr-only">(current)</span></a>
                    </li>
                `);
            }
            else{
                $("#prevPgEnquiry").after(`
                    <li class="page-item">
                        <a class="page-link" onclick="loadEnquiries('`+ parseInt(j)+`')" >`+j+`</a>
                    </li>
                `);
            }
        }
    }
    else{
        $("#paginationEnquiry").html("");
    }
}

async function loadPaginationClient( pageNum, pgLen){
    if(pgLen>1){
        if(pageNum==1){
            $("#paginationClient").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgClient" class="page-item disabled">
                            <a class="page-link" tabindex="-1">Previous</a>
                        </li>
                
                
                        <li class="page-item">
                            <a class="page-link" onclick="loadClients('`+(parseInt(pageNum)+1)+`')">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        else if(pageNum==pgLen){
            $("#paginationClient").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgClient" class="page-item">
                            <a class="page-link" onclick="loadClients('`+(parseInt(pageNum)-1)+`')">Previous</a>
                        </li>
                
                
                        <li class="page-item disabled">
                            <a class="page-link" tabindex="-1">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        else{
            $("#paginationClient").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgClient" class="page-item">
                            <a class="page-link" onclick="loadClients('`+(parseInt(pageNum)-1)+`')">Previous</a>
                        </li>
                
                
                        <li class="page-item">
                            <a class="page-link" onclick="loadClients('`+( parseInt(pageNum) +1)+`')">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        for(j=pgLen;j>=1;j--){
            if(j==pageNum){
                $("#prevPgClient").after(`
                    <li class="page-item active">
                        <a class="page-link">`+j+`<span class="sr-only">(current)</span></a>
                    </li>
                `);
            }
            else{
                $("#prevPgClient").after(`
                    <li class="page-item">
                        <a class="page-link" onclick="loadClients('`+ parseInt(j)+`')" >`+j+`</a>
                    </li>
                `);
            }
        }
    }
    else{
        $("#paginationClient").html("");
    }
}

async function deleteEnquiry(id){    
    data=await deleteEnquiryApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),id);
    $(data).ready(async function(){
        if(data.error==false){
            pgNum=sessionStorage.getItem("pageNumEnquiry");
            await loadEnquiries(pgNum);
        }
        else{
            $(".modal-header").html(`<h1>Error Message</h1>`);
            document.getElementById("showModal").click();
            $(".modal-body").html(`
                <p class="force text-white">
                    An error Occured!, Contact Admin
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            `);        
        }
    });
}

async function deleteClient(id,form){   
    console.log(form)
    datadl=await deleteClientApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),id,form);
    $(datadl).ready(async function(){
        if(datadl.error==false){
            pgNumd=sessionStorage.getItem("pageNumClient");
            await loadClients(pgNumd);
        }
        else{
            $(".modal-header").html(`<h1>Error Message</h1>`);
            document.getElementById("showModal").click();
            $(".modal-body").html(`
                <p class="force text-white">
                    An error Occured!, Contact Admin
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            `);        
        }
    });
}

async function deleteSearchEnquiry(id){
    data=await deleteEnquiryApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),id);
    $(data).ready(async function(){
        if(data.error==false){
            val=sessionStorage.getItem("searchEnquiry");
            await searchEnquiry(val);
        }
        else{
            $(".modal-header").html(`<h1>Error Message</h1>`);
            document.getElementById("showModal").click();
            $(".modal-body").html(`
                <p class="force text-white">
                    An error Occured!, Contact Admin
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            `);        
        }
    });
}

async function deleteSearchClient(id,form){
    datads=await deleteClientApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),id,form);
    $(datads).ready(async function(){
        if(datads.error==false){
            val=sessionStorage.getItem("searchClient");
            await searchClient(val);
        }
        else{
            $(".modal-header").html(`<h1>Error Message</h1>`);
            document.getElementById("showModal").click();
            $(".modal-body").html(`
                <p class="force text-white">
                    An error Occured!, Contact Admin
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            `);        
        }
    });
}

async function clearEnquiries(){
    document.getElementById("showModal").click();
    $(".modal-body").html(`
    <div>
     <div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>
    </div>
`);
$(".modal-header").html(`<h1>Clear Enquiries...</h1>`);
    
        $(".modal-body").html(`
            <p class="force text-white">
                Are you sure you want to clear enquiries?
            </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-success message_close" data-dismiss="modal" >Continue</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>    
            `);      
            
            $(".message_close").click(async function(){
                data=await clearEnquiryApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"));
                $(data).ready(async function(){
                    if(data.error==false){
                        pgNum=sessionStorage.getItem("pageNumEnquiry");
                        await loadEnquiries(pgNum);
                    }
                    else{
                        $(".modal-header").html(`<h1>Error Message</h1>`);                        
                        $(".modal-body").html(`
                            <p class="force text-white">
                                An error Occured!, Contact Admin
                            </p>
                        `);
                        $(".modal-footer").html(`
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        `);        
                    }
                });     
            });  
    
    
}

async function searchEnquiry(value){
    data1= await searchEnquiryApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"name",value);
    data2= await searchEnquiryApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"email",value);
    data3= await searchEnquiryApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"phone",value);    
    data4= await searchEnquiryApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),"date",value);

    email=sessionStorage.getItem("email");
    password=sessionStorage.getItem("password");

    sessionStorage.setItem("searchEnquiry",value);
   
    $("#enquiries").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
    $("#paginationEnquiry").html(``);

    //console.log(value)
    if(data1.length>0 || data2.length>0 || data3.length>0 || data4.length>0){

        $("#enquiries").html(`
             <button id="enquirySearchBack" class="btn btn-danger">Back</button>
        `);
        $("#enquirySearchBack").click(function(){
            loadEnquiries(sessionStorage.getItem("pageNumEnquiry"));
        })

        
        
        if(data1.length>0){
            if(data1.data.lastName.length>0){
                $("#enquiries").append(`
                    <div class="enquiry_date mt-3">LastName</div>
                `);
                
                for(i=0;i<data1.data.lastName.length;i++){
                    $("#enquiries").append(`
                        
                      <div class="container-fluid pt-0">
                      
                        <hr>
                        <div class="card mt-0 ">
                            <div class="card-header">
                               <b> `+data1.data.lastName.data[i].lastName+`</b>&nbsp`+data1.data.lastName.data[i].firstName+`
                                <div style="float:right">`+data1.data.lastName.data[i].timeCreated+`</div>
                            </div>
                            <div class="card-body">
                                `+data1.data.lastName.data[i].message+`
                            </div>
                            <div class="card-footer">                                                                        
                                <a class="btn btn-primary" href="mailto:`+data1.data.lastName.data[i].email+`"><i class="fa fa-envelope"></i></a>                                    
                                <a class="btn btn-primary" href="tel:`+data1.data.lastName.data[i].phone+`"><i class="fa fa-phone"></i></a>
                                <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+data1.data.lastName.data[i].phone+`" target="_blank">
                                  <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                                </a>
                                <button class="btn btn-danger" onclick="deleteSearchEnquiry('`+data1.data.lastName.data[i].enquiryId+`')"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                      </div>
                
                   `);
                }
            }
            if(data1.data.firstName.length>0){
                $("#enquiries").append(`
                    <div class="enquiry_date mt-3">FirstName</div>
                `);
                for(i=0;i<data1.data.firstName.length;i++){
                    $("#enquiries").append(`
                        
                      <div class="container-fluid pt-0">
                        <hr>
                        <div class="card mt-0 ">
                            <div class="card-header">
                               `+data1.data.firstName.data[i].lastName+`&nbsp<b>`+data1.data.firstName.data[i].firstName+`</b>
                                <div style="float:right">`+data1.data.firstName.data[i].timeCreated+`</div>
                            </div>
                            <div class="card-body">
                                `+data1.data.firstName.data[i].message+`
                            </div>
                            <div class="card-footer">                                                                        
                                <a class="btn btn-primary" href="mailto:`+data1.data.firstName.data[i].email+`"><i class="fa fa-envelope"></i></a>                                    
                                <a class="btn btn-primary" href="tel:`+data1.data.firstName.data[i].phone+`"><i class="fa fa-phone"></i></a>
                                <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+data1.data.firstName.data[i].phone+`" target="_blank">
                                  <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                                </a>
                                <button class="btn btn-danger" onclick="deleteSearchEnquiry('`+data1.data.firstName.data[i].enquiryId+`')"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                      </div>
                
                   `);
                }
            }
        }

        if(data2.length>0){
            $("#enquiries").append(`
                    <div class="enquiry_date mt-3">Email</div>
            `);
            for(j=0;j<data2.data.length;j++){
                $("#enquiries").append(`
                        
                <div class="container-fluid pt-0">
                    <hr>
                    <div class="card mt-0 ">
                        <div class="card-header">
                            `+data2.data[j].lastName+`&nbsp`+data2.data[j].firstName+`
                            <div style="float:right">`+data2.data[j].timeCreated+`</div>
                        </div>
                        <div class="card-body">
                            `+data2.data[j].message+`
                        </div>
                        <div class="card-footer">                                                                        
                            <a class="btn btn-primary" href="mailto:`+data2.data[j].email+`"><i class="fa fa-envelope"></i></a>                                    
                            <a class="btn btn-primary" href="tel:`+data2.data[j].phone+`"><i class="fa fa-phone"></i></a>
                            <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+data2.data[j].phone+`" target="_blank">
                              <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                            </a>
                            <button class="btn btn-danger" onclick="deleteSearchEnquiry('`+data2.data[j].enquiryId+`')"><i class="fa fa-trash"></i></button>
                        </div>
                  </div>
                </div>
            
            `);
            }
        }

        if(data3.length>0){
            $("#enquiries").append(`
                    <div class="enquiry_date mt-3">Phone</div>
            `);
            for(k=0;k<data3.data.length;k++){
                $("#enquiries").append(`
                        
                <div class="container-fluid pt-0">
                    <hr>
                    <div class="card mt-0 ">
                        <div class="card-header">
                            `+data3.data[k].lastName+`&nbsp`+data3.data[k].firstName+`
                            <div style="float:right">`+data3.data[k].timeCreated+`</div>
                        </div>
                        <div class="card-body">
                            `+data3.data[k].message+`
                        </div>
                        <div class="card-footer">                                                                        
                            <a class="btn btn-primary" href="mailto:`+data3.data[k].email+`"><i class="fa fa-envelope"></i></a>                                    
                            <a class="btn btn-primary" href="tel:`+data3.data[k].phone+`"><i class="fa fa-phone"></i></a>
                            <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+data3.data[k].phone+`" target="_blank">
                              <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                            </a>
                            <button class="btn btn-danger" onclick="deleteSearchEnquiry('`+data3.data[k].enquiryId+`')"><i class="fa fa-trash"></i></button>
                        </div>
                  </div>
                </div>
            
            `);
            }
        }

        if(data4.length>0){
            $("#enquiries").append(`
                    <div class="enquiry_date mt-3">Date</div>
            `);
            for(l=0;l<data4.data.length;l++){
                $("#enquiries").append(`
                        
                <div class="container-fluid pt-0">
                    <hr>
                    <div class="card mt-0 ">
                        <div class="card-header">
                            `+data4.data[l].lastName+`&nbsp`+data4.data[l].firstName+`
                            <div style="float:right">`+data4.data[l].timeCreated+`</div>
                        </div>
                        <div class="card-body">
                            `+data4.data[l].message+`
                        </div>
                        <div class="card-footer">                                                                        
                            <a class="btn btn-primary" href="mailto:`+data4.data[l].email+`"><i class="fa fa-envelope"></i></a>                                    
                            <a class="btn btn-primary" href="tel:`+data4.data[l].phone+`"><i class="fa fa-phone"></i></a>
                            <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+data4.data[l].phone+`" target="_blank">
                              <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                            </a>
                            <button class="btn btn-danger" onclick="deleteSearchEnquiry('`+data4.data[l].enquiryId+`')"><i class="fa fa-trash"></i></button>
                        </div>
                  </div>
                </div>
            
            `);
            }
        }


    }
    else{
        $("#enquiries").html(`
        <button id="enquirySearchBack" class="btn btn-danger">Back</button>
        <div class="empty_message">Oops!, couldn't find what you were looking for.</div>
    `);
    
    $("#enquirySearchBack").click(function(){
        loadEnquiries(sessionStorage.getItem("pageNumEnquiry"));
    })
    
    }
    
}

async function searchClient(value){
    
    datasc= await searchClientApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),value);
    

    email=sessionStorage.getItem("email");
    password=sessionStorage.getItem("password");

    sessionStorage.setItem("searchClient",value);
   
    $("#clients").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
    $("#paginationClient").html(``);

    //console.log(value)
    if(datasc.length>0){

        $("#clients").html(`
             <button id="clientSearchBack" class="btn btn-danger">Back</button>
        `);
        $("#clientSearchBack").click(function(){
            loadClients(sessionStorage.getItem("pageNumClient"));
        })
       

        if(datasc.length>0){
            
            for(j=0;j<datasc.data.length;j++){
                $("#clients").append(`
                <div class="container-fluid pt-0">
                <hr>
                   <div class="card mt-0 ">
                   <div class="card-header">
                       `+datasc.data[j].name+`
                       <div style="float:right">`+datasc.data[j].timeCreated+`</div>
                   </div>
                   <div class="card-body">
                       `+datasc.data[j].comment+`
                   </div>
                   <div class="card-footer">                                                                        
                       <a class="btn btn-primary" href="mailto:`+datasc.data[j].email+`"><i class="fa fa-envelope"></i></a>                                    
                       <a class="btn btn-primary" href="tel:`+datasc.data[j].phone+`"><i class="fa fa-phone"></i></a>
                       <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+datasc.data[j].phone+`" target="_blank">
                         <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                       </a>
                       <button class="btn btn-danger" onclick="deleteClient('`+datasc.data[j].clientId+`','`+datasc.data[j].form+`')"><i class="fa fa-trash"></i></button>
                       &nbsp;&nbsp;|&nbsp;&nbsp;
                       <a class="btn btn-primary" href="`+datasc.data[j].form+`">Download Form</a>
                   </div>
             </div>
           </div>
               
               `);
            }
        }     



    }
    else{
        $("#enquiries").html(`
        <button id="enquirySearchBack" class="btn btn-danger">Back</button>
        <div class="empty_message">Oops!, couldn't find what you were looking for.</div>
    `);
    
    $("#enquirySearchBack").click(function(){
        loadEnquiries(sessionStorage.getItem("pageNumEnquiry"));
    })
    
    }
    
} 

async function loadPosts(pageNum){

    pageSizePost=5;
    email=sessionStorage.getItem("email");
    password=sessionStorage.getItem("password");
   
    $("#posts").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
    $("#pagination").html(``);
    sessionStorage.setItem("pageNum",pageNum);

    datap= await getAllJobPostsApi(pageNum,pageSizePost);

    $(datap).ready(function(){
        
        if(datap.error==true){
            
            $("posts").html(`
                    <div class="error_message">Could not load Job Postings, Contact Admin!</div>
            `);
            $("#pagination").html(``);
        }
        else if(datap.error==false){
            $("#pagination").html(``);
            
            if(datap.length<1){
                $("#posts").html(`
                    <div class="empty_message">There are no Job Postings!</div>
                `);
            }
            else{
                $("#posts").html(``);
                $('[data-toggle="tooltip"]').tooltip();
                $('.toast').toast('show');
                $("#posts").append(`
                    <div class="container enquiry_date">`+datap.data[0].dateCreated+`</div>
                `);
                
                
                
                if(datap.data[0].companyLogo==null){
                    $("#posts").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogo('`+datap.data[0].postId+`','`+datap.data[0].companyName+`','`+datap.data[0].companyLogo+`')">
                                    `+datap.data[0].companyName+`
                                    <div style="float:right">`+datap.data[0].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li><b>Job Title: </b>`+datap.data[0].jobTitle+`</li>                        
                                        <li><b>Location: </b>`+datap.data[0].location+`</li>
                                        <li><b>Age Range: </b>`+datap.data[0].ageRange+`</li>
                                        <li><b>Gender: </b>`+datap.data[0].gender+`</li>
                                        <li><b>Qualification: </b>`+datap.data[0].qualification+`</li>
                                        <li><b>Experience: </b>`+datap.data[0].experience+`</li>
                                        <li><b>Job Description: </b>`+datap.data[0].jobDescription+`</li>
                                        <li><b>Company Description: </b>`+datap.data[0].companyDescription+`</li>
                                        <li><b>Deadline: </b>`+datap.data[0].deadline+`</li>
                                    </ul>
                                </div>
                                <div class="card-footer">                                                                                                            
                                    <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+datap.data[0].postId+`')"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPost('`+datap.data[0].postId+`')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePost('`+datap.data[0].postId+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;|&nbsp;
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+datap.data[0].jobTitle+`&nbsp;at&nbsp;`+datap.data[0].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+datap.data[0].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+datap.data[0].jobTitle+`&nbsp;at&nbsp;`+datap.data[0].companyName+`&url=`+shareurl+`%2Fjobs?id=`+datap.data[0].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+datap.data[0].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                                                                                                                
                                    <br/><br/>
                                    <span>posted by `+datap.data[0].createdBy+`</span>
                                </div>
                          </div>
                        </div>
                    
                `);
                }
                else{
                    $("#posts").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogo('`+datap.data[0].postId+`','`+datap.data[0].companyName+`','`+datap.data[0].companyLogo+`')">
                                    `+datap.data[0].companyName+`
                                    <img class="img img-img-thumbnail" style="height:35px; width:40px;"  src="`+datap.data[0].companyLogo+`"/>
                                    <div style="float:right">`+datap.data[0].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li><b>Job Title: </b>`+datap.data[0].jobTitle+`</li>                        
                                        <li><b>Location: </b>`+datap.data[0].location+`</li>
                                        <li><b>Age Range: </b>`+datap.data[0].ageRange+`</li>
                                        <li><b>Gender: </b>`+datap.data[0].gender+`</li>
                                        <li><b>Qualification: </b>`+datap.data[0].qualification+`</li>
                                        <li><b>Experience: </b>`+datap.data[0].experience+`</li>
                                        <li><b>Job Description: </b>`+datap.data[0].jobDescription+`</li>
                                        <li><b>Company Description: </b>`+datap.data[0].companyDescription+`</li>
                                        <li><b>Deadline: </b>`+datap.data[0].deadline+`</li>
                                    </ul>
                                </div>
                                <div class="card-footer">                                                                                                            
                                    <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+datap.data[0].postId+`')"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPost('`+datap.data[0].postId+`')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePost('`+datap.data[0].postId+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;|&nbsp;
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+datap.data[0].jobTitle+`&nbsp;at&nbsp;`+datap.data[0].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+datap.data[0].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+datap.data[0].jobTitle+`&nbsp;at&nbsp;`+datap.data[0].companyName+`&url=`+shareurl+`%2Fjobs?id=`+datap.data[0].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+datap.data[0].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                    <br/><br/>
                                    <span>posted by `+datap.data[0].createdBy+`</span>
                                </div>
                          </div>
                        </div>
                    
                `);
                }
                
                if(datap.data.length>1){
                    for(m=1;m<datap.data.length;m++){                    
                    
                        if(datap.data[m].dateCreated!=datap.data[m-1].dateCreated){
                            $("#posts").append(`
                                <div class="container enquiry_date mt-3">`+datap.data[m].dateCreated+`</div>
                            `);
                        }
                        if(datap.data[m].companyLogo==null){
                            $("#posts").append(`
                                
                                <div class="container-fluid pt-0">
                                    <hr>
                                    <div class="card mt-0 ">
                                        <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogo('`+datap.data[m].postId+`','`+datap.data[m].companyName+`','`+datap.data[m].companyLogo+`')">
                                            `+datap.data[m].companyName+`                                
                                            <div style="float:right">`+datap.data[m].timeCreated+`</div>
                                        </div>
                                        <div class="card-body">
                                            <ul>
                                                <li><b>Job Title: </b>`+datap.data[m].jobTitle+`</li>                        
                                                <li><b>Location: </b>`+datap.data[m].location+`</li>
                                                <li><b>Age Range: </b>`+datap.data[m].ageRange+`</li>
                                                <li><b>Gender: </b>`+datap.data[m].gender+`</li>
                                                <li><b>Qualification: </b>`+datap.data[m].qualification+`</li>
                                                <li><b>Experience: </b>`+datap.data[m].experience+`</li>
                                                <li><b>Job Description: </b>`+datap.data[m].jobDescription+`</li>
                                                <li><b>Company Description: </b>`+datap.data[m].companyDescription+`</li>
                                                <li><b>Deadline: </b>`+datap.data[m].deadline+`</li>
                                            </ul>
                                        </div>
                                        <div class="card-footer">                                                                                                            
                                            <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+datap.data[m].postId+`')"><i class="fa fa-eye"></i></button>
                                            <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPost('`+datap.data[m].postId+`')"><i class="fa fa-pencil"></i></button>
                                            <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePost('`+datap.data[m].postId+`')"><i class="fa fa-trash"></i></button>
                                            &nbsp;|&nbsp;
                                            <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+datap.data[m].jobTitle+`&nbsp;at&nbsp;`+datap.data[m].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+datap.data[m].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                            <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+datap.data[m].jobTitle+`&nbsp;at&nbsp;`+datap.data[m].companyName+`&url=`+shareurl+`%2Fjobs?id=`+datap.data[m].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                            <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+datap.data[m].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                            <br/><br/>
                                            <span>posted by `+datap.data[m].createdBy+`</span>
                                        </div>
                                  </div>
                                </div>
                            
                        `);
                        }
                        else{
                            $("#posts").append(`
                                
                                <div class="container-fluid pt-0">
                                    <hr>
                                    <div class="card mt-0 ">
                                        <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogo('`+datap.data[m].postId+`','`+datap.data[m].companyName+`','`+datap.data[m].companyLogo+`')">
                                            `+datap.data[m].companyName+`
                                            <img class="img img-img-thumbnail" style="height:35px; width:40px;"  src="`+datap.data[m].companyLogo+`"/>
                                            <div style="float:right">`+datap.data[m].timeCreated+`</div>
                                        </div>
                                        <div class="card-body">
                                            <ul>
                                                <li><b>Job Title: </b>`+datap.data[m].jobTitle+`</li>                        
                                                <li><b>Location: </b>`+datap.data[m].location+`</li>
                                                <li><b>Age Range: </b>`+datap.data[m].ageRange+`</li>
                                                <li><b>Gender: </b>`+datap.data[m].gender+`</li>
                                                <li><b>Qualification: </b>`+datap.data[m].qualification+`</li>
                                                <li><b>Experience: </b>`+datap.data[m].experience+`</li>
                                                <li><b>Job Description: </b>`+datap.data[m].jobDescription+`</li>
                                                <li><b>Company Description: </b>`+datap.data[m].companyDescription+`</li>
                                                <li><b>Deadline: </b>`+datap.data[m].deadline+`</li>
                                            </ul>
                                        </div>
                                        <div class="card-footer">                                                                                                            
                                            <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+datap.data[m].postId+`')"><i class="fa fa-eye"></i></button>
                                            <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPost('`+datap.data[m].postId+`')"><i class="fa fa-pencil"></i></button>
                                            <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePost('`+datap.data[m].postId+`')"><i class="fa fa-trash"></i></button>
                                            &nbsp;|&nbsp;
                                            <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+datap.data[m].jobTitle+`&nbsp;at&nbsp;`+datap.data[m].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+datap.data[m].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                            <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+datap.data[m].jobTitle+`&nbsp;at&nbsp;`+datap.data[m].companyName+`&url=`+shareurl+`%2Fjobs?id=`+datap.data[m].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                            <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+datap.data[m].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                            <br/><br/>
                                            <span>posted by `+datap.data[m].createdBy+`</span>
                                        </div>
                                  </div>
                                </div>
                            
                        `);
                        }
                    }
                }
            }
            
            var pgLenPost=Math.ceil(datap.length/pageSizePost);
            
            loadPagination(pageNum,pgLenPost);
        }
    });
}

async function loadPagination( pageNumP, pgLenP){
    if(pgLenP>1){
        if(pageNumP==1){
            $("#pagination").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgP" class="page-item disabled">
                            <a class="page-link" tabindex="-1">Previous</a>
                        </li>
                
                
                        <li class="page-item">
                            <a class="page-link" onclick="loadPosts('`+(parseInt(pageNumP)+1)+`')">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        else if(pageNumP==pgLenP){
            $("#pagination").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgP" class="page-item">
                            <a class="page-link" onclick="loadPosts('`+(parseInt(pageNumP)-1)+`')">Previous</a>
                        </li>
                
                
                        <li class="page-item disabled">
                            <a class="page-link" tabindex="-1">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        else{
            $("#pagination").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgP" class="page-item">
                            <a class="page-link" onclick="loadPosts('`+(parseInt(pageNumP)-1)+`')">Previous</a>
                        </li>
                
                
                        <li class="page-item">
                            <a class="page-link" onclick="loadPosts('`+( parseInt(pageNumP) +1)+`')">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        for(l=pgLenP;l>=1;l--){
            if(l==pageNumP){
                $("#prevPgP").after(`
                    <li class="page-item active">
                        <a class="page-link">`+l+`<span class="sr-only">(current)</span></a>
                    </li>
                `);
            }
            else{
                $("#prevPgP").after(`
                    <li class="page-item">
                        <a class="page-link" onclick="loadPosts('`+ parseInt(l)+`')" >`+l+`</a>
                    </li>
                `);
            }
        }
    }
    else{
        $("#pagination").html("");
    }
}


async function viewPost(id){
    
    $("#jobposts").fadeOut(function(){
        $("#application").fadeIn(function(){
            loadApplication(1,id);
        });
    });
}

async function loadApplication(pageNum,id){

    pageSizeA=5;
    email=sessionStorage.getItem("email");
    password=sessionStorage.getItem("password");
   
    $("#applications").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
    $("#paginationApplication").html(``);
    sessionStorage.setItem("pageNumApplication",pageNum);

    dataA= await getAllJobApplicationsApi(email,password,id,pageNum,pageSizeA);
    dataL=await searchJobPostsApi("id",id);
    $(dataA).ready(function(){
        
        if(dataA.error==true){
            
            $("#applications").html(`
                    <div class="error_message">Could not load Job Applications, Contact Admin!</div>
            `);
            $("#paginationApplication").html(``);
        }
        else if(dataA.error==false){
            $("#paginationApplication").html(``);
            $("#applications").html(``);
            
            if(dataA.length<1){
                $("#applications").html(`
                    <div style="text-align:center">
                        <h2>`+dataL.data[0].jobTitle+` at `+dataL.data[0].companyName+`</h2>
                    </div>
                    <div class="empty_message">There are no Job Applications on this Job Posting yet!</div>
                `);
            }
            else{  
                $("#applications").html(`
                    <div style="text-align:center">
                        <h2>`+dataL.data[0].jobTitle+` at `+dataL.data[0].companyName+`</h2>
                    </div>
                `);              
                $("#applications").append(`
                    <div class="container enquiry_date">`+dataA.data[0].dateCreated+`</div>
                `);
                $("#applications").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header">
                                    `+dataA.data[0].lastName+`&nbsp`+dataA.data[0].firstName+`
                                    <div style="float:right">`+dataA.data[0].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <b>Email: </b> `+dataA.data[0].email+`<br/>
                                    <b>Phone: </b> `+dataA.data[0].phone+`<br/>
                                    <b>Comment: </b> `+dataA.data[0].comment+`
                                </div>
                                <div class="card-footer">                                                                        
                                    <a class="btn btn-primary" href="mailto:`+dataA.data[0].email+`"><i class="fa fa-envelope"></i></a>                                    
                                    <a class="btn btn-primary" href="tel:`+dataA.data[0].phone+`"><i class="fa fa-phone"></i></a>
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+dataA.data[0].phone+`" target="_blank">
                                      <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                                    </a>
                                    |
                                    <a class="btn btn-primary" target="_blank" href="`+dataA.data[0].cv+`">CV</a>
                                    <a class="btn btn-primary" target="_blank" href="`+dataA.data[0].cover+`">Cover</a>
                                    <a class="btn btn-primary" target="_blank" href="`+dataA.data[0].passport+`">Passport</a>
                                </div>
                          </div>
                        </div>
                    
                    `);
                if(dataA.data.length>1){
                    for(k=1;k<dataA.data.length;k++){                    
                    
                        if(dataA.data[k].dateCreated!=dataA.data[k-1].dateCreated){
                            $("#applications").append(`
                                <div class="container enquiry_date mt-3">`+dataA.data[k].dateCreated+`</div>
                            `);
                        }
                        $("#applications").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header">
                                    `+dataA.data[k].lastName+`&nbsp`+dataA.data[k].firstName+`
                                    <div style="float:right">`+dataA.data[k].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <b>Email: </b> `+dataA.data[k].email+`<br/>
                                    <b>Phone: </b> `+dataA.data[k].phone+`<br/>
                                    <b>Comment: </b> `+dataA.data[k].comment+`
                                </div>
                                <div class="card-footer">                                                                        
                                    <a class="btn btn-primary" href="mailto:`+dataA.data[k].email+`"><i class="fa fa-envelope"></i></a>                                    
                                    <a class="btn btn-primary" href="tel:`+dataA.data[k].phone+`"><i class="fa fa-phone"></i></a>
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Whatsapp" href="https://wa.me/`+dataA.data[k].phone+`" target="_blank">
                                      <i class="fa fa-whatsapp" style="color:white;font-size:x-large;text-decoration: none;" aria-hidden="true"></i>
                                    </a>
                                    |
                                    <a class="btn btn-primary" target="_blank" href="`+dataA.data[k].cv+`">CV</a>
                                    <a class="btn btn-primary" target="_blank" href="`+dataA.data[k].cover+`">Cover</a>
                                    <a class="btn btn-primary" target="_blank" href="`+dataA.data[k].passport+`">Passport</a>
                                </div>
                          </div>
                        </div>
                    
                    `);
                    }
                }
            }
            var pgLenA=Math.ceil(dataA.length/pageSizeA);
            loadPaginationApplication(pageNum,pgLenA);
        }
    });
}

async function loadPaginationApplication( pageNumA, pgLenA){
    if(pgLenA>1){
        if(pageNumA==1){
            $("#paginationApplication").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgApplication" class="page-item disabled">
                            <a class="page-link" tabindex="-1">Previous</a>
                        </li>
                
                
                        <li class="page-item">
                            <a class="page-link" onclick="loadApplication('`+(parseInt(pageNumA)+1)+`')">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        else if(pageNumA==pgLenA){
            $("#paginationApplication").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgApplication" class="page-item">
                            <a class="page-link" onclick="loadApplication('`+(parseInt(pageNumA)-1)+`')">Previous</a>
                        </li>
                
                
                        <li class="page-item disabled">
                            <a class="page-link" tabindex="-1">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        else{
            $("#paginationApplication").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgApplicationclass="page-item">
                            <a class="page-link" onclick="loadApplication('`+(parseInt(pageNumA)-1)+`')">Previous</a>
                        </li>
                
                
                        <li class="page-item">
                            <a class="page-link" onclick="loadApplication('`+( parseInt(pageNumA) +1)+`')">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        for(a=pgLenA;a>=1;a--){
            if(a==pageNumA){
                $("#prevPgApplication").after(`
                    <li class="page-item active">
                        <a class="page-link">`+a+`<span class="sr-only">(current)</span></a>
                    </li>
                `);
            }
            else{
                $("#prevPgApplication").after(`
                    <li class="page-item">
                        <a class="page-link" onclick="loadApplication'`+ parseInt(a)+`')" >`+a+`</a>
                    </li>
                `);
            }
        }
    }
    else{
        $("#paginationApplication").html("");
    }
}


async function editPost(id){
    $(".modal-dialog").addClass("modal-xl");
    
    document.getElementById("showModal").click();
    $(".modal-body").html(`
    <div>
    <div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>
    </div>
    `);
    $(".modal-header").html(`<h1>Edit Job Posting...</h1>`);
    $(".modal-footer").html(`                
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>    
            `);
    
            data= await searchJobPostsApi("id",id);

        $(".modal-body").html(`
                <form id="editPostForm" method="post">  
                    <div class="form-group">
                        <label class="form-control-label text-white">Company Name</label> 
                        <input class="form-control" type="text" id="editCompanyName" name="email" placeholder="Company Name" value="`+data.data[0].companyName+`" required >
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Job Title</label> 
                        <input class="form-control" type="text" id="editJobTitle" name="email" placeholder="Job Title" value="`+data.data[0].jobTitle+`" required>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Location</label> 
                        <input class="form-control" type="text" id="editLocation" name="email" placeholder="Company Location" value="`+data.data[0].location+`" required>
                    </div>   

                    <div class="form-group">
                        <label class="form-control-label text-white">Age Range</label> 
                        <input class="form-control" type="text" id="editAgeRange" name="email" placeholder="Age Range" value="`+data.data[0].ageRange+`" required>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Gender: &nbsp;&nbsp;</label> 
                        <input class="" type="radio"  id="editMale" name="editGender" value="male" required>&nbsp;Male&nbsp;
                        <input class="" type="radio"  id="editFemale" name="editGender" value="female" required>&nbsp;Female&nbsp;
                        <input class="" type="radio"  id="editAll" name="editGender" value="all" required>&nbsp;All&nbsp;
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Qualification</label> 
                        <input class="form-control" type="text" id="editQualification" name="email" placeholder="Qualification" value="`+data.data[0].qualification+`" required>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Experience</label> 
                        <input class="form-control" type="text" id="editExperience" name="email" placeholder="Experience" value="`+data.data[0].experience+`" required>
                    </div>                                                      

                    <div class="form-group">
                        <label class="form-control-label text-white">Job Description</label> 
                        <textarea class="form-control" id="editJobDescription" name="email" placeholder="Job Description" required>`+data.data[0].jobDescription+`</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Company Description</label> 
                        <textarea class="form-control" id="editCompanyDescription" name="email" placeholder="Company Description" required>`+data.data[0].companyDescription+`</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Deadline</label> 
                        <textarea class="form-control" id="editdeadline" name="email" placeholder="Deadline" required>`+data.data[0].deadline+`</textarea>
                    </div>

                    <input type="submit" class="btn btn-block btn-primary" value="Edit Post"/>

                </form>

                
            `);

            if(data.data[0].gender=="male"){
                document.getElementById("editMale").checked=true;
            }
            if(data.data[0].gender=="female"){
                document.getElementById("editFemale").checked=true;
            }
            if(data.data[0].gender=="all"){
                document.getElementById("editAll").checked=true;
            }

            $("#editPostForm").submit(async function(e){
               // $(".modal-body").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
                e.preventDefault();
                editCompanyName=$("#editCompanyName").val();
                editJobTitle=$("#editJobTitle").val();
                editLocation=$("#editLocation").val();
                editAgeRange=$("#editAgeRange").val();
                editGender=$("input[name=editGender]:checked").val();
                editQualification=$("#editQualification").val();
                editExperience=$("#editExperience").val();
                editJobDescription=$("#editJobDescription").val();
                editCompanyDescription=$("#editCompanyDescription").val();
                editdeadline=$("#editdeadline").val();                
                
                data1=await editJobPostApi(id,sessionStorage.getItem("email"),sessionStorage.getItem("password"),editCompanyName,editAgeRange,editGender,editQualification,editExperience,editJobTitle,editLocation,editCompanyDescription,editJobDescription,editdeadline);
                
                $(data1).ready(async function(){
                    console.log("seen")
                    $(".modal-dialog").removeClass("modal-xl"); 
                    if(data1.error==false){
                        pgNum=sessionStorage.getItem("pageNum");
                        await loadPosts(pgNum);
                        $(".modal-body").html(`
                            <p class="force text-white">
                                Post has be updated!
                            </p>
                        `);
                        $(".modal-footer").html(`
                            <button type="button" class="btn btn-success" data-dismiss="modal">Continue</button>
                        `);        
                    }
                    else{
                        $(".modal-header").html(`<h1>Error Message</h1>`);                        
                        $(".modal-body").html(`
                            <p class="force text-white">
                                An error Occured!, Contact Admin
                            </p>
                        `);
                        $(".modal-footer").html(`
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        `);        
                    }
                });
            });

                  
            
            //$(".modal-dialog").removeClass("modal-xl"); 

}

async function editCompanyLogo(id,name,image){
    
    document.getElementById("showModal").click();
    $(".modal-body").html(`
    <div>
    <div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>
    </div>
    `);
    $(".modal-header").html(`<h1>Edit Job Posting Logo...</h1>`);
    $(".modal-footer").html(`                
                <button type="button" class="btn btn-danger" id="message_close" data-dismiss="modal">Delete Logo</button>    
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>                
            `);

            $("#message_close").click(async function(){
                data1= await deleteJobPostImageApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),id);
                $(data1).ready(async function(){
                    if(data1.error==false){
                        pgNum=sessionStorage.getItem("pageNum");
                        await loadPosts(pgNum);
                    }
                });
            });
        $(".modal-body").html(`
                <form id="editPostForm" action="`+apiurl+`editJobPost/index.php" method="post" enctype="multipart/form-data">  
                    
                <input type="text" name="email" placeholder="email" value="`+sessionStorage.getItem("email")+`" style="display:none">
                <input type="text" name="password" placeholder="password" value="`+sessionStorage.getItem("password")+`" style="display:none">
                <input type="text" name="companyName" placeholder="password" value="`+name+`" style="display:none">
                <input type="text" name="postId" placeholder="email" value="`+id+`" style="display:none">
                <input type="text" name="criteria" placeholder="password" value="image" style="display:none">
                <input type="text" name="imageName" value="`+image+`" style="display:none"/>

                <div class="form-group">
                    <label class="form-control-label text-white">Company Logo for `+name+`</label>
                    <input class="form-control" name="companyLogo" accept="image/jpg, image/png, image/jpeg, image/gif" type="file" required>    
                </div>
                

                    <input type="submit" class="btn btn-block btn-primary" value="Change Logo"/>

                </form>

                
            `);

}

async function deletePost(id){
    document.getElementById("showModal").click();
    $(".modal-body").html(`
    <div>
    <div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>
    </div>
`);
$(".modal-header").html(`<h1>Deleting Job Posting...</h1>`);
    
        $(".modal-body").html(`
            <p class="force text-white">
                Are you sure you want to delete this job posting?
            </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-success message_close" data-dismiss="modal" >Continue</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>    
            `);      
            
            $(".message_close").click(async function(){
                $(".modal-body").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
                data=await deleteJobPostApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),id);
                $(data).ready(async function(){
                    if(data.error==false){
                        pgNum=sessionStorage.getItem("pageNum");
                        await loadPosts(pgNum);
                    }
                    else{
                        $(".modal-header").html(`<h1>Error Message</h1>`);                        
                        $(".modal-body").html(`
                            <p class="force text-white">
                                An error Occured!, Contact Admin
                            </p>
                        `);
                        $(".modal-footer").html(`
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        `);        
                    }
                });     
            });  
    
 
}

async function createJobPost(){
    $(".modal-dialog").addClass("modal-xl");
    
    
    $(".modal-body").html(`
    <div>
        <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
    `);
    $(".modal-header").html(`<h1>Create Job Posting...</h1>`);
    $(".modal-footer").html(`                
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>    
    `);

    document.getElementById("showModal").click();
    
    $(".modal-body").html(`
                <form  id="createPostForm" action="`+apiurl+`createJobPost/index.php" method="post" enctype="multipart/form-data">  

                <input type="text" name="email" placeholder="email" value="`+sessionStorage.getItem("email")+`" style="display:none">
                <input type="text" name="password" placeholder="password" value="`+sessionStorage.getItem("password")+`" style="display:none">
                
                    <div class="form-group">
                        <label class="form-control-label text-white">Company Logo</label> 
                        <input class="form-control" type="file" accept="image/jpg, image/png, image/jpeg, image/gif" id="editCompanyName" name="companyLogo">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-control-label text-white">Company Name*</label> 
                        <input class="form-control" type="text" id="editCompanyName" name="companyName" placeholder="Company Name" required >
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Job Title*</label> 
                        <input class="form-control" type="text" id="editJobTitle" name="jobTitle" placeholder="Job Title" required>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Location*</label> 
                        <input class="form-control" type="text" id="editLocation" name="location" placeholder="Company Location" required>
                    </div>   

                    <div class="form-group">
                        <label class="form-control-label text-white">Age Range*</label> 
                        <input class="form-control" type="text" id="editAgeRange" name="ageRange" placeholder="Age Range" required>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Gender*: &nbsp;&nbsp;</label> 
                        <input class="" type="radio"  id="editMale" name="gender" value="male" required>&nbsp;Male&nbsp;
                        <input class="" type="radio"  id="editFemale" name="gender" value="female" required>&nbsp;Female&nbsp;
                        <input class="" type="radio"  id="editAll" name="gender" value="all" required>&nbsp;All&nbsp;
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Qualification*</label> 
                        <input class="form-control" type="text" id="editQualification" name="qualification" placeholder="Qualification" required>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Experience*</label> 
                        <input class="form-control" type="text" id="experience" name="experience" placeholder="Experience" required>
                    </div>                                                      

                    <div class="form-group">
                        <label class="form-control-label text-white">Job Description*</label> 
                        <textarea class="form-control" id="editJobDescription" name="jobDescription" placeholder="Job Description" required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Company Description*</label> 
                        <textarea class="form-control" id="editCompanyDescription" name="companyDescription" placeholder="Company Description" required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Deadline</label> 
                        <textarea class="form-control" id="editDeadline" name="deadline" placeholder="Deadline"></textarea>
                    </div>

                    <input type="submit" class="btn btn-block btn-primary" value="Create Job Post"/>

                </form>

                
            `);

}


async function search(value){
    
    dataP1= await searchJobPostsApi("company",value);
    dataP2= await searchJobPostsApi("location",value);
    dataP3= await searchJobPostsApi("gender",value);    
    dataP4= await searchJobPostsApi("jobTitle",value);

    email=sessionStorage.getItem("email");
    password=sessionStorage.getItem("password");

    sessionStorage.setItem("search",value);
   
    $("#posts").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
    $("#pagination").html(``);

    
    if(dataP1.length>0 || dataP2.length>0 || dataP3.length>0 || dataP4.length>0){

        document.getElementById("createJobPost").disabled=true;

        $("#posts").html(`
             <button id="searchBack" class="btn btn-danger">Back</button>
        `);
        $("#searchBack").click(function(){
            document.getElementById("createJobPost").disabled=false;
            loadPosts(sessionStorage.getItem("pageNum"));
        })

        if(dataP1.length>0){
            $("#posts").append(`
                    <div class="enquiry_date mt-3">Company Name</div>
            `);
            for(w=0;w<dataP1.length;w++){
                if(dataP1.data[w].companyLogo==null){
                    $("#posts").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogoSearch('`+dataP1.data[w].postId+`','`+dataP1.data[w].companyName+`','`+dataP1.data[w].companyLogo+`')">
                                    `+dataP1.data[w].companyName+`                                
                                    <div style="float:right">`+dataP1.data[w].dateCreated+`&nbsp;|&nbsp;`+dataP1.data[w].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li><b>Job Title: </b>`+dataP1.data[w].jobTitle+`</li>                        
                                        <li><b>Location: </b>`+dataP1.data[w].location+`</li>
                                        <li><b>Age Range: </b>`+dataP1.data[w].ageRange+`</li>
                                        <li><b>Gender: </b>`+dataP1.data[w].gender+`</li>
                                        <li><b>Qualification: </b>`+dataP1.data[w].qualification+`</li>
                                        <li><b>Experience: </b>`+dataP1.data[w].experience+`</li>
                                        <li><b>Job Description: </b>`+dataP1.data[w].jobDescription+`</li>
                                        <li><b>Company Description: </b>`+dataP1.data[w].companyDescription+`</li>
                                        <li><b>Deadline: </b>`+dataP1.data[w].deadline+`</li>
                                    </ul>
                                </div>
                                <div class="card-footer">                                                                                                            
                                    <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+dataP1.data[w].postId+`')"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPostSearch('`+dataP1.data[w].postId+`')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePostSearch('`+dataP1.data[w].postId+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;|&nbsp;
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+dataP1.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP1.data[w].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+dataP1.data[w].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+dataP1.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP1.data[w].companyName+`&url=`+shareurl+`%2Fjobs?id=`+dataP1.data[w].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+dataP1.data[w].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                    <br/><br/>
                                    <span>posted by `+dataP1.data[w].createdBy+`</span>
                                </div>
                          </div>
                        </div>
                    
                `);
                }
                else{
                    $("#posts").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogoSearch('`+dataP1.data[w].postId+`','`+dataP1.data[w].companyName+`','`+dataP1.data[w].companyLogo+`')">
                                    `+dataP1.data[w].companyName+`
                                    <img class="img img-img-thumbnail" style="height:35px; width:40px;"  src="`+dataP1.data[w].companyLogo+`"/>
                                    <div style="float:right">`+dataP1.data[w].dateCreated+`&nbsp;|&nbsp;`+dataP1.data[w].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li><b>Job Title: </b>`+dataP1.data[w].jobTitle+`</li>                        
                                        <li><b>Location: </b>`+dataP1.data[w].location+`</li>
                                        <li><b>Age Range: </b>`+dataP1.data[w].ageRange+`</li>
                                        <li><b>Gender: </b>`+dataP1.data[w].gender+`</li>
                                        <li><b>Qualification: </b>`+dataP1.data[w].qualification+`</li>
                                        <li><b>Experience: </b>`+dataP1.data[w].experience+`</li>
                                        <li><b>Job Description: </b>`+dataP1.data[w].jobDescription+`</li>
                                        <li><b>Company Description: </b>`+dataP1.data[w].companyDescription+`</li>
                                        <li><b>Deadline: </b>`+dataP1.data[w].deadline+`</li>
                                    </ul>
                                </div>
                                <div class="card-footer">                                                                                                            
                                    <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+dataP1.data[w].postId+`')"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPostSearch('`+dataP1.data[w].postId+`')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePostSearch('`+dataP1.data[w].postId+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;|&nbsp;
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+dataP1.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP1.data[w].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+dataP1.data[w].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+dataP1.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP1.data[w].companyName+`&url=`+shareurl+`%2Fjobs?id=`+dataP1.data[w].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+dataP1.data[w].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                    <br/><br/>
                                    <span>posted by `+dataP1.data[w].createdBy+`</span>
                                </div>
                          </div>
                        </div>
                    
                `);
                
                }
            }
        }

        if(dataP2.length>0){
            $("#posts").append(`
                    <div class="enquiry_date mt-3">Location</div>
            `);
            for(w=0;w<dataP2.length;w++){
                if(dataP2.data[w].companyLogo==null){
                    $("#posts").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogoSearch('`+dataP2.data[w].postId+`','`+dataP2.data[w].companyName+`','`+dataP2.data[w].companyLogo+`')">
                                    `+dataP2.data[w].companyName+`                                
                                    <div style="float:right">`+dataP2.data[w].dateCreated+`&nbsp;|&nbsp;`+dataP2.data[w].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li><b>Job Title: </b>`+dataP2.data[w].jobTitle+`</li>                        
                                        <li><b>Location: </b>`+dataP2.data[w].location+`</li>
                                        <li><b>Age Range: </b>`+dataP2.data[w].ageRange+`</li>
                                        <li><b>Gender: </b>`+dataP2.data[w].gender+`</li>
                                        <li><b>Qualification: </b>`+dataP2.data[w].qualification+`</li>
                                        <li><b>Experience: </b>`+dataP2.data[w].experience+`</li>
                                        <li><b>Job Description: </b>`+dataP2.data[w].jobDescription+`</li>
                                        <li><b>Company Description: </b>`+dataP2.data[w].companyDescription+`</li>
                                        <li><b>Deadline: </b>`+dataP2.data[w].deadline+`</li>
                                    </ul>
                                </div>
                                <div class="card-footer">                                                                                                            
                                    <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+dataP2.data[w].postId+`')"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPostSearch('`+dataP2.data[w].postId+`')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePostSearch('`+dataP2.data[w].postId+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;|&nbsp;
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+dataP2.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP2.data[w].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+dataP2.data[w].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+dataP2.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP2.data[w].companyName+`&url=`+shareurl+`%2Fjobs?id=`+dataP2.data[w].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+dataP2.data[w].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                    <br/><br/>
                                    <span>posted by `+dataP2.data[w].createdBy+`</span>
                                </div>
                          </div>
                        </div>
                    
                `);
                }
                else{
                    $("#posts").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogoSearch('`+dataP2.data[w].postId+`','`+dataP2.data[w].companyName+`','`+dataP2.data[w].companyLogo+`')">
                                    `+dataP2.data[w].companyName+`
                                    <img class="img img-img-thumbnail" style="height:35px; width:40px;"  src="`+dataP2.data[w].companyLogo+`"/>
                                    <div style="float:right">`+dataP2.data[w].dateCreated+`&nbsp;|&nbsp;`+dataP2.data[w].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li><b>Job Title: </b>`+dataP2.data[w].jobTitle+`</li>                        
                                        <li><b>Location: </b>`+dataP2.data[w].location+`</li>
                                        <li><b>Age Range: </b>`+dataP2.data[w].ageRange+`</li>
                                        <li><b>Gender: </b>`+dataP2.data[w].gender+`</li>
                                        <li><b>Qualification: </b>`+dataP2.data[w].qualification+`</li>
                                        <li><b>Experience: </b>`+dataP2.data[w].experience+`</li>
                                        <li><b>Job Description: </b>`+dataP2.data[w].jobDescription+`</li>
                                        <li><b>Company Description: </b>`+dataP2.data[w].companyDescription+`</li>
                                        <li><b>Deadline: </b>`+dataP2.data[w].deadline+`</li>
                                    </ul>
                                </div>
                                <div class="card-footer">                                                                                                            
                                    <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+dataP2.data[w].postId+`')"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPostSearch('`+dataP2.data[w].postId+`')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePostSearch('`+dataP2.data[w].postId+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;|&nbsp;
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+dataP2.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP2.data[w].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+dataP2.data[w].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+dataP2.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP2.data[w].companyName+`&url=`+shareurl+`%2Fjobs?id=`+dataP2.data[w].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+dataP2.data[w].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                    <br/><br/>
                                    <span>posted by `+dataP2.data[w].createdBy+`</span>
                                </div>
                          </div>
                        </div>
                    
                `);
                
                }
            }
        }

        if(dataP3.length>0){
            $("#posts").append(`
                    <div class="enquiry_date mt-3">Gender</div>
            `);
            for(w=0;w<dataP3.length;w++){
                if(dataP3.data[w].companyLogo==null){
                    $("#posts").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogoSearch('`+dataP3.data[w].postId+`','`+dataP3.data[w].companyName+`','`+dataP3.data[w].companyLogo+`')">
                                    `+dataP3.data[w].companyName+`                                
                                    <div style="float:right">`+dataP3.data[w].dateCreated+`&nbsp;|&nbsp;`+dataP3.data[w].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li><b>Job Title: </b>`+dataP3.data[w].jobTitle+`</li>                        
                                        <li><b>Location: </b>`+dataP3.data[w].location+`</li>
                                        <li><b>Age Range: </b>`+dataP3.data[w].ageRange+`</li>
                                        <li><b>Gender: </b>`+dataP3.data[w].gender+`</li>
                                        <li><b>Qualification: </b>`+dataP3.data[w].qualification+`</li>
                                        <li><b>Experience: </b>`+dataP3.data[w].experience+`</li>
                                        <li><b>Job Description: </b>`+dataP3.data[w].jobDescription+`</li>
                                        <li><b>Company Description: </b>`+dataP3.data[w].companyDescription+`</li>
                                        <li><b>Deadline: </b>`+dataP3.data[w].deadline+`</li>
                                    </ul>
                                </div>
                                <div class="card-footer">                                                                                                            
                                    <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+dataP3.data[w].postId+`')"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPostSearch('`+dataP3.data[w].postId+`')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePostSearch('`+dataP3.data[w].postId+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;|&nbsp;
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+dataP3.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP3.data[w].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+dataP3.data[w].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+dataP3.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP3.data[w].companyName+`&url=`+shareurl+`%2Fjobs?id=`+dataP3.data[w].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+dataP3.data[w].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                    <br/><br/>
                                    <span>posted by `+dataP3.data[w].createdBy+`</span>
                                </div>
                          </div>
                        </div>
                    
                `);
                }
                else{
                    $("#posts").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogoSearch('`+dataP3.data[w].postId+`','`+dataP3.data[w].companyName+`','`+dataP3.data[w].companyLogo+`')">
                                    `+dataP3.data[w].companyName+`
                                    <img class="img img-img-thumbnail" style="height:35px; width:40px;"  src="`+dataP3.data[w].companyLogo+`"/>
                                    <div style="float:right">`+dataP3.data[w].dateCreated+`&nbsp;|&nbsp;`+dataP3.data[w].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li><b>Job Title: </b>`+dataP3.data[w].jobTitle+`</li>                        
                                        <li><b>Location: </b>`+dataP3.data[w].location+`</li>
                                        <li><b>Age Range: </b>`+dataP3.data[w].ageRange+`</li>
                                        <li><b>Gender: </b>`+dataP3.data[w].gender+`</li>
                                        <li><b>Qualification: </b>`+dataP3.data[w].qualification+`</li>
                                        <li><b>Experience: </b>`+dataP3.data[w].experience+`</li>
                                        <li><b>Job Description: </b>`+dataP3.data[w].jobDescription+`</li>
                                        <li><b>Company Description: </b>`+dataP3.data[w].companyDescription+`</li>
                                        <li><b>Deadline: </b>`+dataP3.data[w].deadline+`</li>
                                    </ul>
                                </div>
                                <div class="card-footer">                                                                                                            
                                    <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+dataP3.data[w].postId+`')"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPostSearch('`+dataP3.data[w].postId+`')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePostSearch('`+dataP3.data[w].postId+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;|&nbsp;
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+dataP3.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP3.data[w].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+dataP3.data[w].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+dataP3.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP3.data[w].companyName+`&url=`+shareurl+`%2Fjobs?id=`+dataP3.data[w].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+dataP3.data[w].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                    <br/><br/>
                                    <span>posted by `+dataP3.data[w].createdBy+`</span>
                                </div>
                          </div>
                        </div>
                    
                `);
                
                }
            }
        }

        if(dataP4.length>0){
            $("#posts").append(`
                    <div class="enquiry_date mt-3">Job Title</div>
            `);
            for(w=0;w<dataP4.length;w++){
                if(dataP4.data[w].companyLogo==null){
                    $("#posts").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogoSearch('`+dataP4.data[w].postId+`','`+dataP4.data[w].companyName+`','`+dataP4.data[w].companyLogo+`')">
                                    `+dataP4.data[w].companyName+`                                
                                    <div style="float:right">`+dataP4.data[w].dateCreated+`&nbsp;|&nbsp;`+dataP4.data[w].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li><b>Job Title: </b>`+dataP4.data[w].jobTitle+`</li>                        
                                        <li><b>Location: </b>`+dataP4.data[w].location+`</li>
                                        <li><b>Age Range: </b>`+dataP4.data[w].ageRange+`</li>
                                        <li><b>Gender: </b>`+dataP4.data[w].gender+`</li>
                                        <li><b>Qualification: </b>`+dataP4.data[w].qualification+`</li>
                                        <li><b>Experience: </b>`+dataP4.data[w].experience+`</li>
                                        <li><b>Job Description: </b>`+dataP4.data[w].jobDescription+`</li>
                                        <li><b>Company Description: </b>`+dataP4.data[w].companyDescription+`</li>
                                        <li><b>Deadline: </b>`+dataP4.data[w].deadline+`</li>
                                    </ul>
                                </div>
                                <div class="card-footer">                                                                                                            
                                    <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+dataP4.data[w].postId+`')"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPostSearch('`+dataP4.data[w].postId+`')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePostSearch('`+dataP4.data[w].postId+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;|&nbsp;
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+dataP4.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP4.data[w].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+dataP4.data[w].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+dataP4.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP4.data[w].companyName+`&url=`+shareurl+`%2Fjobs?id=`+dataP4.data[w].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+dataP4.data[w].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                    <br/><br/>
                                    <span>posted by `+dataP4.data[w].createdBy+`</span>
                                </div>
                          </div>
                        </div>
                    
                `);
                }
                else{
                    $("#posts").append(`
                        
                        <div class="container-fluid pt-0">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header" style="cursor:pointer;" onclick="editCompanyLogoSearch('`+dataP4.data[w].postId+`','`+dataP4.data[w].companyName+`','`+dataP4.data[w].companyLogo+`')">
                                    `+dataP4.data[w].companyName+`
                                    <img class="img img-img-thumbnail" style="height:35px; width:40px;"  src="`+dataP4.data[w].companyLogo+`"/>
                                    <div style="float:right">`+dataP4.data[w].dateCreated+`&nbsp;|&nbsp;`+dataP4.data[w].timeCreated+`</div>
                                </div>
                                <div class="card-body">
                                    <ul>
                                        <li><b>Job Title: </b>`+dataP4.data[w].jobTitle+`</li>                        
                                        <li><b>Location: </b>`+dataP4.data[w].location+`</li>
                                        <li><b>Age Range: </b>`+dataP4.data[w].ageRange+`</li>
                                        <li><b>Gender: </b>`+dataP4.data[w].gender+`</li>
                                        <li><b>Qualification: </b>`+dataP4.data[w].qualification+`</li>
                                        <li><b>Experience: </b>`+dataP4.data[w].experience+`</li>
                                        <li><b>Job Description: </b>`+dataP4.data[w].jobDescription+`</li>
                                        <li><b>Company Description: </b>`+dataP4.data[w].companyDescription+`</li>
                                        <li><b>Deadline: </b>`+dataP4.data[w].deadline+`</li>
                                    </ul>
                                </div>
                                <div class="card-footer">                                                                                                            
                                    <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="View Applications" onclick="viewPost('`+dataP4.data[w].postId+`')"><i class="fa fa-eye"></i></button>
                                    <button class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Edit Post" onclick="editPostSearch('`+dataP4.data[w].postId+`')"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="deletePostSearch('`+dataP4.data[w].postId+`')"><i class="fa fa-trash"></i></button>
                                    &nbsp;|&nbsp;
                                    <a class="btn btn-success" data-toggle="tooltip" data-placement="top" target="_blank" href="https://api.whatsapp.com/send?text=`+dataP4.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP4.data[w].companyName+`%20%0A%0a%20`+shareurl+`/jobs?id=`+dataP4.data[w].postId+`" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://twitter.com/intent/tweet?text=`+dataP4.data[w].jobTitle+`&nbsp;at&nbsp;`+dataP4.data[w].companyName+`&url=`+shareurl+`%2Fjobs?id=`+dataP4.data[w].postId+`%2F&via=hr_ideal" title="Share on Twitter"><i class="fa fa-twitter"></i></a>
                                    <a class="btn btn-primary" data-toggle="tooltip" data-placement="top" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`/jobs?id=`+dataP4.data[w].postId+`" title="Share on Facebook"><i class="fa fa-facebook"></i></a>
                                    <br/><br/>
                                    <span>posted by `+dataP4.data[w].createdBy+`</span>
                                </div>
                          </div>
                        </div>
                    
                `);
                
                }
            }
        }
    }
    else{
        document.getElementById("createJobPost").disabled=true;
        $("#posts").html(`
        <button id="searchBack" class="btn btn-danger">Back</button>
        <div class="empty_message">Oops!, couldn't find what you were looking for.</div>
    `);
    
    $("#searchBack").click(function(){
        document.getElementById("createJobPost").disabled=false;
        loadPosts(sessionStorage.getItem("pageNum"));
    })
    
    }
    

}


async function editPostSearch(id){
    $(".modal-dialog").addClass("modal-xl");
    
    document.getElementById("showModal").click();
    $(".modal-body").html(`
    <div>
    <div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>
    </div>
    `);
    $(".modal-header").html(`<h1>Edit Job Posting...</h1>`);
    $(".modal-footer").html(`                
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>    
            `);
    
            data= await searchJobPostsApi("id",id);

        $(".modal-body").html(`
                <form id="editPostForm" method="post">  
                    <div class="form-group">
                        <label class="form-control-label text-white">Company Name</label> 
                        <input class="form-control" type="text" id="editCompanyName" name="email" placeholder="Company Name" value="`+data.data[0].companyName+`" required >
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Job Title</label> 
                        <input class="form-control" type="text" id="editJobTitle" name="email" placeholder="Job Title" value="`+data.data[0].jobTitle+`" required>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Location</label> 
                        <input class="form-control" type="text" id="editLocation" name="email" placeholder="Company Location" value="`+data.data[0].location+`" required>
                    </div>   

                    <div class="form-group">
                        <label class="form-control-label text-white">Age Range</label> 
                        <input class="form-control" type="text" id="editAgeRange" name="email" placeholder="Age Range" value="`+data.data[0].ageRange+`" required>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Gender: &nbsp;&nbsp;</label> 
                        <input class="" type="radio"  id="editMale" name="editGender" value="male" required>&nbsp;Male&nbsp;
                        <input class="" type="radio"  id="editFemale" name="editGender" value="female" required>&nbsp;Female&nbsp;
                        <input class="" type="radio"  id="editAll" name="editGender" value="all" required>&nbsp;All&nbsp;
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Qualification</label> 
                        <input class="form-control" type="text" id="editQualification" name="email" placeholder="Qualification" value="`+data.data[0].qualification+`" required>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Experience</label> 
                        <input class="form-control" type="text" id="editExperience" name="email" placeholder="Experience" value="`+data.data[0].experience+`" required>
                    </div>                                                      

                    <div class="form-group">
                        <label class="form-control-label text-white">Job Description</label> 
                        <textarea class="form-control" id="editJobDescription" name="email" placeholder="Job Description" required>`+data.data[0].jobDescription+`</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Company Description</label> 
                        <textarea class="form-control" id="editCompanyDescription" name="email" placeholder="Company Description" required>`+data.data[0].companyDescription+`</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-control-label text-white">Deadline</label> 
                        <textarea class="form-control" id="editdeadline" name="email" placeholder="Deadline" required>`+data.data[0].deadline+`</textarea>
                    </div>

                    <input type="submit" class="btn btn-block btn-primary" value="Edit Post"/>

                </form>

                
            `);

            if(data.data[0].gender=="male"){
                document.getElementById("editMale").checked=true;
            }
            if(data.data[0].gender=="female"){
                document.getElementById("editFemale").checked=true;
            }
            if(data.data[0].gender=="all"){
                document.getElementById("editAll").checked=true;
            }

            $("#editPostForm").submit(async function(e){
              //  $(".modal-body").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
                e.preventDefault();
                editCompanyName=$("#editCompanyName").val();
                editJobTitle=$("#editJobTitle").val();
                editLocation=$("#editLocation").val();
                editAgeRange=$("#editAgeRange").val();
                editGender=$("input[name=editGender]:checked").val();
                editQualification=$("#editQualification").val();
                editExperience=$("#editExperience").val();
                editJobDescription=$("#editJobDescription").val();
                editCompanyDescription=$("#editCompanyDescription").val();
                editdeadline=$("#editdeadline").val();                
                
                data1=await editJobPostApi(id,sessionStorage.getItem("email"),sessionStorage.getItem("password"),editCompanyName,editAgeRange,editGender,editQualification,editExperience,editJobTitle,editLocation,editCompanyDescription,editJobDescription,editdeadline);
                
                $(data1).ready(async function(){
                    $(".modal-dialog").removeClass("modal-xl"); 
                    if(data1.error==false){
                        value=sessionStorage.getItem("search");
                        await search(value);
                        $(".modal-body").html(`
                            <p class="force text-white">
                                Post has be updated!
                            </p>
                        `);
                        $(".modal-footer").html(`
                            <button type="button" class="btn btn-success" data-dismiss="modal">Continue</button>
                        `);        
                    }
                    else{
                        $(".modal-header").html(`<h1>Error Message</h1>`);                        
                        $(".modal-body").html(`
                            <p class="force text-white">
                                An error Occured!, Contact Admin
                            </p>
                        `);
                        $(".modal-footer").html(`
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        `);        
                    }
                });
            });

                  
            
            //$(".modal-dialog").removeClass("modal-xl"); 

}

async function editCompanyLogoSearch(id,name,image){
    
    document.getElementById("showModal").click();
    $(".modal-body").html(`
    <div>
        <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
    `);
    $(".modal-header").html(`<h1>Edit Job Posting Logo...</h1>`);
    $(".modal-footer").html(`                
                <button type="button" class="btn btn-danger" id="message_close" data-dismiss="modal">Delete Logo</button>    
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>                
            `);

            $("#message_close").click(async function(){
                data1= await deleteJobPostImageApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),id);
                $(data1).ready(async function(){
                    if(data1.error==false){
                        value=sessionStorage.getItem("search");
                        await search(value);
                    }
                });
            });
        $(".modal-body").html(`
                <form id="editPostForm" action="`+apiurl+`editJobPost/index.php" method="post" enctype="multipart/form-data">  
                    
                <input type="text" name="email" placeholder="email" value="`+sessionStorage.getItem("email")+`" style="display:none">
                <input type="text" name="password" placeholder="password" value="`+sessionStorage.getItem("password")+`" style="display:none">
                <input type="text" name="companyName" placeholder="password" value="`+name+`" style="display:none">
                <input type="text" name="postId" placeholder="email" value="`+id+`" style="display:none">
                <input type="text" name="criteria" placeholder="password" value="image" style="display:none">
                <input type="text" name="imageName" value="`+image+`" style="display:none"/>

                <div class="form-group">
                    <label class="form-control-label text-white">Company Logo for `+name+`</label>
                    <input class="form-control" name="companyLogo" accept="image/jpg, image/png, image/jpeg, image/gif" type="file" required>    
                </div>
                

                    <input type="submit" class="btn btn-block btn-primary" value="Change Logo"/>

                </form>

                
            `);

}

async function deletePostSearch(id){
    
    document.getElementById("showModal").click();
    $(".modal-body").html(`
    <div>
        <div class="spinner-border spinner-border-xl text-info" style="margin-left:49%"></div>
    </div>
`);
$(".modal-header").html(`<h1>Deleting Job Posting...</h1>`);
    
        $(".modal-body").html(`
            <p class="force text-white">
                Are you sure you want to delete this job posting?
            </p>
            `);
            $(".modal-footer").html(`
                <button type="button" class="btn btn-success message_close" data-dismiss="modal" >Continue</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>    
            `);      
            
            $(".message_close").click(async function(){
                $(".modal-body").html(`<div style="text-align: center;"><img src="../assets/preloader.gif" style="width:10%"></div>`);
                data=await deleteJobPostApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),id);
                $(data).ready(async function(){
                    if(data.error==false){
                        value=sessionStorage.getItem("search");
                        await search(value);
                    }
                    else{
                        $(".modal-header").html(`<h1>Error Message</h1>`);                        
                        $(".modal-body").html(`
                            <p class="force text-white">
                                An error Occured!, Contact Admin
                            </p>
                        `);
                        $(".modal-footer").html(`
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        `);        
                    }
                });     
            });  
    
 
}