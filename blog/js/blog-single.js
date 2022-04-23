const shareurl="https://osegbuecharles.com/blog/blog-single/"

$(document).ready(async function(){
    

    const url=getAllUrlParams();


    

    await viewBlogApi(url.id);
    
    var dataId=await searchBlogInfoApi("id",url.id);

    $("#che").click(function(){
        
        s=$("#de").val();

        console.log(s);
    });

    $(dataId).ready(function(){
        data=dataId.data[0];
        $("#blogSubject").html(data.subject);
        document.title=data.subject;
        $("#blogAuthor").html(`<a href="../?author=`+data.author+`">`+data.author+`</a>`);
        $("#blogDate").append(`
            <a href="../?date=`+data.dateCreated+`"><time datetime="`+data.dateCreated+`">`+data.dateCreated+`</time></a>
        `);

        $("#blogCategory").html(`<a href="../?category=`+data.category+`">`+data.category+`</a>`);

        if(data.tags.includes(",")){
            tag=cleanTag(data.tags);
            
            for(k=0;k<tag.length;k++){
                $("#blogTag").append(`
                    <li><a href="../?tag=`+tag[k]+`">`+tag[k]+`</a></li>
                `);
            }
        }
        else{
            $("#blogTag").append(`<li><a href="../?tag=`+data.tags+`">`+data.tags+`</a></li>`);
        }

     
        $("#blogShareFooter").html(`
            <a target="_blank" onclick="share(`+data.id+`)" href="https://twitter.com/intent/tweet?text=`+data.subject+`&nbsp;by&nbsp;`+data.author+`&url=`+shareurl+`%2F?id=`+data.id+`%2F&via=AUIAA" title="Share on Twitter"><i style="font-size:x-large;" class="icofont-twitter text-primary"></i></a>
            <a target="_blank" onclick="share(`+data.id+`)" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`?id=`+data.id+`" title="Share on Facebook"><i style="font-size:x-large;" class="icofont-facebook text-primary"></i></a>
            <a target="_blank" onclick="share(`+data.id+`)" href="https://api.whatsapp.com/send?text=`+data.subject+`&nbsp;by&nbsp;`+data.author+`%20%0A%0a%20`+shareurl+`?id=`+data.id+`"" title="Share on Whatsapp"><i style="font-size:x-large;" class="fa fa-whatsapp text-success"></i></a>
        `);

        $("#blogContent").html(data.content);
        
        $("#shareBlog").click(function(){
            shareBlog(data.id,data.subject,data.author);
        });
    });

    loadBlogInfo();


    $("#commentForm").submit( async function(e){

        e.preventDefault();

        $("#commentLoading").fadeIn();
        $("#commentError").fadeOut();
        $("#commentSent").fadeOut();


        name=$("#commentName").val();
        comment=$("textarea[name=comment]").val();
        

        data= await newCommentApi(name,comment,url.id);

         $(data).ready(function(){
            if(data.error==false){
                $("#commentLoading").fadeOut(function(){                   
                    $("#commentSent").fadeIn();
                });
                loadBlogInfo();
            }
            else{
                $("#commentLoading").fadeOut(function(){
                    $("#commentError").html(data.message);
                    $("#commentError").fadeIn();
                });
            }
        });
    });


    
});


function cleanTag(n){
    res=[];
    temp=""
    for(u=0;u<n.length;u++){
        if(n[u]==","){
            res.push(temp);
            temp="";
        }
        else{
            temp=temp+n[u];
        }
    }
    res.push(temp);
    return res;
}


async function loadBlogInfo(){
    url=getAllUrlParams();
    $("#blogComments").html(`<img src="../assets/preloader.gif" style="width:20%;" />`);
    var dataLo=await searchBlogInfoApi("id",url.id);
    
    var data1=dataLo.data[0];
    
    var data2= await getCommentApi(data1.id) ;
    
        
        $("#blogView").html(data1.views+` Views`);
        $("#blogComment").html(data1.comments+ ` Comments`);
        $("#commentCount").html(data1.comments+ ` Comments`);
        $(".blogLike").html(data1.likes+ ` Likes`);
        $("#blogShare").html(data1.shares+ ` Shares`);
        document.getElementsByTagName("META")[2].content=data1.meta;
       


        liked=JSON.parse(localStorage.getItem("likedList"));
        //localStorage.clear();
        //console.log(liked);
        if(liked!=null){    
            ej=data1.id;
            //console.log(ej);
            if(liked[ej]=="true"){
                $(".likeBlog").css({"color":"red","cursor":"default"});
                $(".likeBlog").removeClass("likeIcon");                
                
            }  
            else{
                $(".likeBlog").click(function(){
                    likeBlog(data1.id);
                });
            }                      
        }        
        else{
            $(".likeBlog").click(function(){
                likeBlog(data1.id);
            });
        }          

    
        $(data2).ready(function(){
            $("#blogComments").html("");
           if(data2.data.length>0){
            for(co=0;co<data2.data.length;co++){
                $("#blogComments").append(`
                    <div class="comment  clearfix py-2">
              
                        <h5><a>`+data2.data[co].name+`</a></h5>
                        <time datetime="`+data2.data[co].dateCreated+`">`+data2.data[co].dateCreated+`</time>
                        <p>
                            `+data2.data[co].comment+`
                        </p>

                        </div>   
                             
        `);
           }
           }

        });
}




async function likeBlog(i){
    //console.log(i);
    data= await likeBlogApi(i);
    
    $(data).ready(function(){
        loadBlogInfo();
    });
}

async function share(i){
    
    data2=await shareBlogApi(i);
    
    
    $(data2).ready(function(){
        loadBlogInfo();
    });
}


async function shareBlog(i,subject,author){
    $(".modal-body").html(`
    
    <div>
        <a onclick="share(`+i+`)" target="_blank" href="https://api.whatsapp.com/send?text=`+subject+`&nbsp;by&nbsp;`+author+`%20%0A%0a%20`+shareurl+`?id=`+i+`"><i style="font-size: 60px;" class="bx bxl-whatsapp-square text-success"></i></a>
        <a onclick="share(`+i+`)" target="_blank" href="https://twitter.com/intent/tweet?text=`+subject+`&nbsp;by&nbsp;`+author+`&url=`+shareurl+`%2F?id=`+i+`%2F&via=AUIAA"><i style="font-size: 60px;" class="bx bxl-twitter text-primary"></i></a>
        <a onclick="share(`+i+`)" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`?id=`+i+`"><i style="font-size: 60px;" class="bx bxl-facebook-square text-primary"></i></a>
    </div>
    
    `);
    document.getElementById("showModal").click();
}


function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
}
