const shareurl="https://osegbuecharles.com/blog/blog-single/"

$(document).ready(async function(){
    pageNumBlog=sessionStorage.getItem("pageNumBlog");

    url=getAllUrlParams();

    
    
   
    if(pageNumBlog>1){
        if(url.author!=undefined){
            loadCategory("author",clean(url.author));
        }
        else if(url.category!=undefined){
            loadCategory("category",clean(url.category));
        }
        else if(url.tag!=undefined){
            loadCategory("tag",clean(url.tag));
        }
        else if(url.date!=undefined){
            loadCategory("date",clean(url.date));
        }
        else{
            loadBlog(pageNumBlog);
        }
        
    }
    else{
        if(url.author!=undefined){            
            loadCategory("author",clean(url.author));
        }
        else if(url.category!=undefined){
            loadCategory("category",clean(url.category));
        }
        else if(url.tag!=undefined){
            loadCategory("tag",clean(url.tag));
        }
        else if(url.date!=undefined){
            loadCategory("date",clean(url.date));
        }
        else{
            loadBlog(1);
        }
    }
    
    loadCategories();
    loadTags()
    
});


function clean(n){
    console.log(n);
    res=""
    for(cl=0;cl<n.length;cl++){
        if(n[cl]=="%" || n[cl-1]=="%"){
            continue
        }
        else if(n[cl-2]=="%"){
            res=res+" ";
        }
        else{
            res=res+n[cl].toString();
        }

    }
    return res;
}
function setPage(n){
    //console.log(n);
    pageNum=n;
    sessionStorage.setItem("pgNumBlog",n);
}


async function loadBlogInfo(pageNum){
    pageSize=5;
    data= await getBlogInfoApi(pageNum,pageSize);

    for(j=0;j<data.data.length;j++){    
        
        $("#view"+data.data[j].id).html(data.data[j].views);
        $("#comment"+data.data[j].id).html(data.data[j].comments);
        $("#like"+data.data[j].id).html(data.data[j].likes);
        $("#share"+data.data[j].id).html(data.data[j].shares);
        liked=JSON.parse(localStorage.getItem("likedList"));
        //localStorage.clear();
        //console.log(liked);

        if(liked!=null){    
            ej=data.data[j].id;            
            if(liked[ej]=="true"){
                $("#likeIcon"+ej).css({"color":"red","cursor":"default"});
                $("#likeIcon"+ej).removeClass("likeIcon");
                e="likeIcon"+ej
                document.getElementById(e).onclick="";
            }            
            
        }        

    }
}


async function loadCategories(){
    cate=await getExtrasApi("category");
    $(cate).ready(function(){
        
        for(i=0;i<cate.data.length;i++){
            $("#loadCate").append(`
                <li style="cursor: pointer;" onclick="loadCategory('category','`+cate.data[i]+`')"><a>`+cate.data[i]+` <span>(`+cate.count[cate.data[i]]+`)</span></a></li>
            `);
        }
    });
}

async function loadTags(){
    te=await getExtrasApi("tag");
    $(te).ready(function(){
        
        for(i=0;i<te.data.length;i++){
            $("#loadT").append(`
                <li style="cursor:pointer" onclick="loadCategory('tag','`+te.data[i]+`')"><a>`+te.data[i]+`</a></li>
            `);
        }
    });
}



async function likeBlog(i){
    //console.log(i);
    data= await likeBlogApi(i);
    pg=sessionStorage.getItem("pageNumBlog");
    $(data).ready(function(){
        loadBlogInfo(pg);
    });
}

async function share(i){
    
    data2=await shareBlogApi(i);
    
    pg=sessionStorage.getItem("pageNumBlog");
    $(data2).ready(function(){
        loadBlogInfo(pg);
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




async function loadBlog(pageNum){
    window.scrollTo(0,0);
    pageSize=5;
   
    $("#blogView").html(`<div style="text-align: center;"><img src="../../assets/preloader.gif" style="width:10%"></div>`);
    $("#paginationBlog").html(``);
    sessionStorage.setItem("pageNumBlog",pageNum);
    
    data= await getBlogInfoApi(pageNum,pageSize);
    
    
    
    $(data).ready(function(){
        
        if(data.error==true){
            
            $("#blogView").html(`
                    <div class="error-message">Could not load Blogs, Contact <a class="text-warning" href="mailto:support@auiaa.org">support@auiaa.org</a></div>
            `);
            $("#paginationBlog").html(``);
        }
        else if(data.error==false){
            $("#paginationBlog").html(``);
            
            if(data.data.length<1){
                $("#blogView").html(`
                    <article class="entry" data-aos="fade-up">
                        <h3>There are no blogs!</h3>
                    </article>
                `);
                
            }
            else{
                
                $("#blogView").html(``);
               
                for(i=0;i<data.data.length;i++){ 
                   
                    
                        $("#blogView").append(`
                        
                        <!--Entry 1-->
                        <article class="entry" data-aos="fade-up">
            
                          <div id="entryImg`+i+`" class="entry-img">
                            
                          </div>
            
                          <h2 class="entry-title">
                            <a href="blog-single/?id=`+data.data[i].id+`">`+data.data[i].subject+`</a>
                          </h2>
            
                          <div class="entry-meta">
                            <ul>                              
                              <li class="d-flex align-items-center" style="cursor:pointer" onclick="loadCategory('author','`+data.data[i].author+`')"><i class="icofont-user"></i> <a>`+data.data[i].author+`</a></li>
                              <li class="d-flex align-items-center" style="cursor:pointer" onclick="loadCategory('date','`+data.data[i].dateCreated+`')"><i class="icofont-wall-clock"></i> <a><time datetime="`+data.data[i].dateCreated+`">`+data.data[i].dateCreated+`</time></a></li>                            
                              <li class="d-flex align-items-center"><i id="likeIcon`+data.data[i].id+`" onclick="likeBlog(`+data.data[i].id+`)" style="cursor: pointer; font-size:x-large;" class="fa fa-heart likeIcon"></i><a id="like`+data.data[i].id+`"></a></li>
                              <li class="d-flex align-items-center shareBlog" onclick="shareBlog(`+data.data[i].id+`,'`+data.data[i].subject+`','`+data.data[i].author+`')" style="cursor: pointer;"><i class="icofont-share-alt" style="font-size:x-large;"></i> <a id="share`+data.data[i].id+`"></a></li>
                              <li class="d-flex align-items-center"><i class="icofont-eye" style="font-size:x-large;"></i> <a id="view`+data.data[i].id+`"></a></li>
                              <li class="d-flex align-items-center"><i class="icofont-comment" style="font-size:x-large;"></i> <a id="comment`+data.data[i].id+`"></a></li>                              
                              
                            </ul>
                          </div>
            
                          <div class="entry-content">
                            <p>
                              `+data.data[i].meta+`
                            </p>
                            <div class="read-more">
                              <a href="blog-single/?id=`+data.data[i].id+`">Read More</a>
                            </div>
                          </div>
            
                        </article><!-- End blog entry -->
                    
                    `);

                    
                    if(data.data[i].image!="null"){
                        $("#entryImg"+i).html(`<img src="`+data.data[i].image+`" alt="" class="img-fluid metaImage">`)
                    }                                                                                                                    
                   
                }
                loadBlogInfo(pageNum);
            }
            var pgLen=Math.ceil(data.length/pageSize);
            loadPaginationBlog(pageNum,pgLen);
        }
    });
}


async function loadPaginationBlog( pageNum, pgLen){
    if(pgLen>1){
        if(pageNum==1){
            $("#paginationBlog").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgBlog" class="page-item disabled">
                            <a class="page-link" tabindex="-1">Previous</a>
                        </li>
                
                
                        <li class="page-item">
                            <a class="page-link" onclick="loadBlog('`+(parseInt(pageNum)+1)+`')">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        else if(pageNum==pgLen){
            $("#paginationBlog").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgBlog" class="page-item">
                            <a class="page-link" onclick="loadBlog('`+(parseInt(pageNum)-1)+`')">Previous</a>
                        </li>
                
                
                        <li class="page-item disabled">
                            <a class="page-link" tabindex="-1">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        else{
            $("#paginationBlog").html(`
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        
                        <li id="prevPgBlog" class="page-item">
                            <a class="page-link" onclick="loadBlog('`+(parseInt(pageNum)-1)+`')">Previous</a>
                        </li>
                
                
                        <li class="page-item">
                            <a class="page-link" onclick="loadBlog('`+( parseInt(pageNum) +1)+`')">Next</a>
                        </li>
                   
                    </ul>
                </nav>
            `); 
        }
        for(j=pgLen;j>=1;j--){
            if(j==pageNum){
                $("#prevPgBlog").after(`
                    <li class="page-item active">
                        <a class="page-link bg-warning text-white">`+j+`<span class="sr-only">(current)</span></a>
                    </li>
                `);
            }
            else{
                $("#prevPgBlog").after(`
                    <li class="page-item">
                        <a class="page-link" onclick="loadBlog('`+ parseInt(j)+`')" >`+j+`</a>
                    </li>
                `);
            }
        }
    }
    else{
        $("#paginationBlog").html("");
    }
}


async function loadCategory(criteria,value){
    window.scrollTo(0,0);
    dataCa=await searchBlogInfoApi(criteria,value)

    console.log(value);
    
   
    $("blogView").html(`<div style="text-align: center;"><img src="../../assets/preloader.gif" style="width:10%"></div>`);
    $("#paginationBlog").html(``);

    //console.log(value)
    if(dataCa.length>0){
        
        $("#blogView").html(`
            <button id="blogSearchBack" class="btn btn-danger">Back</button>
        `);
        $("#blogSearchBack").click(function(){
            loadBlog(sessionStorage.getItem("pageNumBlog"));
        })
        $("#blogView").append(`
                <div class="enquiry_date mt-4" style="text-align:justify; font-weight:bold; text-transform:capitalize"><h2>`+criteria+`: `+value+`</h2></div>
        `);
        for(ca=0;ca<dataCa.data.length;ca++){

               
            $("#blogView").append(`
                        
            
            <article class="entry" data-aos="fade-up">

              <div id="entryImgCa`+ca+`" class="entry-img">
                
              </div>

              <h2 class="entry-title">
                <a href="blog-single/?id=`+dataCa.data[ca].id+`">`+dataCa.data[ca].subject+`</a>
              </h2>

              <div class="entry-meta">
                <ul>
                <li class="d-flex align-items-center" style="cursor:pointer" onclick="loadCategory('author','`+dataCa.data[ca].author+`')"><i class="icofont-user"></i> <a>`+dataCa.data[ca].author+`</a></li>
                <li class="d-flex align-items-center" style="cursor:pointer" onclick="loadCategory('date','`+dataCa.data[ca].dateCreated+`')"><i class="icofont-wall-clock"></i> <a><time datetime="`+dataCa.data[ca].dateCreated+`">`+dataCa.data[ca].dateCreated+`</time></a></li>
                <li class="d-flex align-items-center"><i class="icofont-eye"></i> <a id="viewCa`+dataCa.data[ca].id+`"></a></li>
                <li class="d-flex align-items-center"><i class="icofont-comment"></i> <a id="commentCa`+dataCa.data[ca].id+`"></a></li>
                <li class="d-flex align-items-center"><i id="likeIconCa`+dataCa.data[ca].id+`" onclick="likeBlog1(`+dataCa.data[ca].id+`,'`+criteria+`','`+value+`')" style="cursor: pointer;" class="fa fa-thumbs-up likeIcon"></i><a id="likeCa`+dataCa.data[ca].id+`"></a></li>
                <li class="d-flex align-items-center shareBlog" onclick="shareBlog1(`+dataCa.data[ca].id+`,'`+dataCa.data[ca].subject+`','`+dataCa.data[ca].author+`','`+criteria+`','`+value+`')" style="cursor: pointer;"><i class="icofont-share-alt"></i> <a id="shareCa`+dataCa.data[ca].id+`"></a></li>
                </ul>
              </div>

              <div class="entry-content">
                <p>
                  `+dataCa.data[ca].meta+`
                </p>
                <div class="read-more">
                  <a href="blog-single/?id=`+dataCa.data[ca].id+`">Read More</a>
                </div>
              </div>

            </article><!-- End blog entry -->
        
        `);

        
        if(dataCa.data[ca].image!="null"){
            $("#entryImgCa"+ca).html(`<img src="`+dataCa.data[ca].image+`" alt="" class="img-fluid">`)
        }       
                
        }
        loadBlogInfo1(criteria,value);
    }
    else{
        $("#blogView").html(`
        <button id="blogSearchBack" class="btn btn-danger">Back</button>
        <div class="empty_message">Oops!, This `+criteria+` is empty!.</div>
    `);
    
    $("#blogSearchBack").click(function(){
        loadBlog(sessionStorage.getItem("pageNumBlog"));
    })
    
    }
    
}

async function loadBlogInfo1(criteria,value){
    
    data= await searchBlogInfoApi(criteria,value);

    for(k=0;k<data.data.length;k++){    

        //console.log(data.data[k]);
        $("#viewCa"+data.data[k].id).html(data.data[k].views+` Views`);
        $("#commentCa"+data.data[k].id).html(data.data[k].comments+ ` Comments`);
        $("#likeCa"+data.data[k].id).html(data.data[k].likes+ ` Likes`);
        $("#shareCa"+data.data[k].id).html(data.data[k].shares+ ` Shares`);
        liked=JSON.parse(localStorage.getItem("likedList"));
       
        if(liked!=null){    
            ek=data.data[k].id;
            
            if(liked[ek]=="true"){
                $("#likeIconCa"+ek).css({"color":"#0458A6","cursor":"default"});
                $("#likeIconCa"+ek).removeClass("likeIcon");
                w="likeIconCa"+ek
                document.getElementById(w).onclick="";
            }            
            
        }        

    }
}


async function likeBlog1(i,criteria,value){
    //console.log(i);
    data= await likeBlogApi(i);
    pg=sessionStorage.getItem("pageNumBlog");
    $(data).ready(function(){
        loadBlogInfo1(criteria,value);
    });
}

async function share1(i,criteria,value){
    
    data2=await shareBlogApi(i);
    
    pg=sessionStorage.getItem("pageNumBlog");
    $(data2).ready(function(){
        loadBlogInfo1(criteria,value);
    });
}


async function shareBlog1(i,subject,author,criteria,value){
    $(".modal-body").html(`
    
    <div>
        <a onclick="share1(`+i+`,'`+criteria+`','`+value+`')" target="_blank" href="https://api.whatsapp.com/send?text=`+subject+`&nbsp;by&nbsp;`+author+`%20%0A%0a%20`+shareurl+`?id=`+i+`"><i style="font-size: 60px;" class="bx bxl-whatsapp-square text-success"></i></a>
        <a onclick="share1(`+i+`,'`+criteria+`,'`+value+`')" target="_blank" href="https://twitter.com/intent/tweet?text=`+subject+`&nbsp;by&nbsp;`+author+`&url=`+shareurl+`%2F?id=`+i+`%2F&via=AUIAA"><i style="font-size: 60px;" class="bx bxl-twitter text-primary"></i></a>
        <a onclick="share1(`+i+`,'`+criteria+`,'`+value+`')" target="_blank" href="https://web.facebook.com/sharer/sharer.php?u=`+shareurl+`?id=`+i+`"><i style="font-size: 60px;" class="bx bxl-facebook-square text-primary"></i></a>
    </div>
    
    `);
    document.getElementById("showModal").click();
}


async function searchBlog(value){
    
    window.scrollTo(0,0);
    dataSe=await searchBlogInfoApi(criteria,value)
    
    data1= await searchAlumniOwnedBusinessesApi("location",value);
    data2= await searchAlumniOwnedBusinessesApi("name",value);
    data3= await searchAlumniOwnedBusinessesApi("services",value);    

    
   
    $("#listingView").html(`<div style="text-align: center;"><img src="../../assets/preloader.gif" style="width:10%"></div>`);
    $("#paginationListing").html(``);

    //console.log(value)
    if(data1.length>0 || data2.length>0 || data3.length>0 ){

        $("#listingView").html(`
             <button id="listingSearchBack" class="btn btn-danger">Back</button>
        `);
        $("#listingSearchBack").click(function(){
            loadListing(sessionStorage.getItem("pageNumListing"));
        })

        
        
        if(data1.length>0){
            if(data1.data.city.length>0){
                $("#listingView").append(`
                    <div class="enquiry_date mt-3" style="text-align:justify; font-weight:bold;">City</div>
                `);
                
                for(i=0;i<data1.data.city.length;i++){
                    
                        $("#listingView").append(`
                        
                        <div class="container-fluid pt-0" style="text-align:justify">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header">
                                   <b> `+data1.data.city.data[i].name+`</b>
                                </div>
                                <div class="card-body">
                                   <b> Owner:</b><span style="text-transform:capitalize"> `+data1.data.city.data[i].ownerLastName+`&nbsp`+data1.data.city.data[i].ownerFirstName+`</span><br/>
                                   <b> Address:</b> `+data1.data.city.data[i].address+`<br/>
                                    <b>City: `+data1.data.city.data[i].city+`</b><br/>
                                    <b>State:</b> `+data1.data.city.data[i].state+`<br/>
                                    <b>Country:</b> `+data1.data.city.data[i].country+`<br/><br/>
                                    <b>Services</b><br/> `+data1.data.city.data[i].services+`<br/><br/>
                                    <b>Business Description</b><br/> `+data1.data.city.data[i].description+`<br/><br/>
                                    <b>How can you support this business</b><br/> `+data1.data.city.data[i].support+`<br/>
                                </div>
                                <div class="card-footer" id="cardfooterci`+i+`">
                                    <a class="btn btn-warning text-light" href="mailto:`+data1.data.city.data[i].email+`"><i class="fa fa-envelope"></i></a>                                    
                                    <a class="btn btn-warning text-light" href="tel:`+data1.data.city.data[i].phone+`"><i class="fa fa-phone"></i></a>
                                </div>
                          </div>
                        </div>
                    
                    `);

                    if(data1.data.city.data[i].website!="Unspecified"){
                        $("#cardfooterci"+i).append(`<a class="btn btn-warning text-light" href="`+data1.data.city.data[i].website+`"><i class="fa fa-globe"></i></a>`)
                    }
                    if(data1.data.city.data[i].twitter!="Unspecified"){
                        $("#cardfooterci"+i).append(`<a class="btn btn-warning text-light ml-1" href="`+data1.data.city.data[i].twitter+`"><i class="fa fa-twitter"></i></a>`)
                    }
                    if(data1.data.city.data[i].facebook!="Unspecified"){
                        $("#cardfooterci"+i).append(`<a class="btn btn-warning text-light ml-1" href="`+data1.data.city.data[i].facebook+`"><i class="fa fa-facebook"></i></a>`)
                    }
                    if(data1.data.city.data[i].instagram!="Unspecified"){
                        $("#cardfooterci"+i).append(`<a class="btn btn-warning text-light ml-1" href="`+data1.data.city.data[i].instagram+`"><i class="fa fa-instagram"></i></a>`)
                    }
                    
                   
                }
            }
            if(data1.data.state.length>0){
                $("#listingView").append(`
                    <div class="enquiry_date mt-3" style="text-align:justify; font-weight:bold;">State</div>
                `);
                
                for(i=0;i<data1.data.state.length;i++){
                    
                        $("#listingView").append(`
                        
                        <div class="container-fluid pt-0" style="text-align:justify">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header">
                                   <b> `+data1.data.state.data[i].name+`</b>
                                </div>
                                <div class="card-body">
                                   <b> Owner:</b><span style="text-transform:capitalize"> `+data1.data.state.data[i].ownerLastName+`&nbsp`+data1.data.state.data[i].ownerFirstName+`</span><br/>
                                   <b> Address:</b> `+data1.data.state.data[i].address+`<br/>
                                    <b>City:</b> `+data1.data.state.data[i].city+`<br/>
                                    <b>State: `+data1.data.state.data[i].state+`</b><br/>
                                    <b>Country:</b> `+data1.data.state.data[i].country+`<br/><br/>
                                    <b>Services</b><br/> `+data1.data.state.data[i].services+`<br/><br/>
                                    <b>Business Description</b><br/> `+data1.data.state.data[i].description+`<br/><br/>
                                    <b>How can you support this business</b><br/> `+data1.data.state.data[i].support+`<br/>
                                </div>
                                <div class="card-footer" id="cardfooterst`+i+`">
                                    <a class="btn btn-warning text-light" href="mailto:`+data1.data.state.data[i].email+`"><i class="fa fa-envelope"></i></a>                                    
                                    <a class="btn btn-warning text-light" href="tel:`+data1.data.state.data[i].phone+`"><i class="fa fa-phone"></i></a>
                                </div>
                          </div>
                        </div>
                    
                    `);
                    if(data1.data.state.data[i].website!="Unspecified"){
                        $("#cardfooterst"+i).append(`<a class="btn btn-warning text-light" href="`+data1.data.state.data[i].website+`"><i class="fa fa-globe"></i></a>`)
                    }
                    if(data1.data.state.data[i].twitter!="Unspecified"){
                        $("#cardfooterst"+i).append(`<a class="btn btn-warning text-light ml-1" href="`+data1.data.state.data[i].twitter+`"><i class="fa fa-twitter"></i></a>`)
                    }
                    if(data1.data.state.data[i].facebook!="Unspecified"){
                        $("#cardfooterst"+i).append(`<a class="btn btn-warning text-light ml-1" href="`+data1.data.state.data[i].facebook+`"><i class="fa fa-facebook"></i></a>`)
                    }
                    if(data1.data.state.data[i].instagram!="Unspecified"){
                        $("#cardfooterst"+i).append(`<a class="btn btn-warning text-light ml-1" href="`+data1.data.state.data[i].instagram+`"><i class="fa fa-instagram"></i></a>`)
                    }
                    
                   
                }
            }
            
        }

        if(data2.length>0){
            $("#listingView").append(`
                    <div class="enquiry_date mt-3" style="text-align:justify; font-weight:bold;">Business Name</div>
            `);
            for(j=0;j<data2.data.length;j++){

                    $("#listingView").append(`
                    
                    <div class="container-fluid pt-0" style="text-align:justify">
                        <hr>
                        <div class="card mt-0 ">
                            <div class="card-header">
                               <b> `+data2.data[j].name+`</b>
                            </div>
                            <div class="card-body">
                               <b> Owner:</b><span style="text-transform:capitalize"> `+data2.data[j].ownerLastName+`&nbsp`+data2.data[j].ownerFirstName+`</span><br/>
                               <b> Address:</b> `+data2.data[j].address+`<br/>
                                <b>City:</b> `+data2.data[j].city+`<br/>
                                <b>State:</b> `+data2.data[j].state+`<br/>
                                <b>Country:</b> `+data2.data[j].country+`<br/><br/>
                                <b>Services</b><br/> `+data2.data[j].services+`<br/><br/>
                                <b>Business Description</b><br/> `+data2.data[j].description+`<br/><br/>
                                <b>How can you support this business</b><br/> `+data2.data[j].support+`<br/>
                            </div>
                            <div class="card-footer" id="cardfooterna`+j+`">
                                <a class="btn btn-warning text-light" href="mailto:`+data2.data[j].email+`"><i class="fa fa-envelope"></i></a>                                    
                                <a class="btn btn-warning text-light" href="tel:`+data2.data[j].phone+`"><i class="fa fa-phone"></i></a>
                            </div>
                      </div>
                    </div>
                
                `);
                
                if(data2.data[j].website!="Unspecified"){
                    $("#cardfooterna"+j).append(`<a class="btn btn-warning text-light" href="`+data2.data[j].website+`"><i class="fa fa-globe"></i></a>`)
                }
                if(data2.data[j].twitter!="Unspecified"){
                    $("#cardfooterna"+j).append(`<a class="btn btn-warning text-light ml-1" href="`+data2.data[j].twitter+`"><i class="fa fa-twitter"></i></a>`)
                }
                if(data2.data[j].facebook!="Unspecified"){
                    $("#cardfooterna"+j).append(`<a class="btn btn-warning text-light ml-1" href="`+data2.data[j].facebook+`"><i class="fa fa-facebook"></i></a>`)
                }
                if(data2.data[j].instagram!="Unspecified"){
                    $("#cardfooterna"+j).append(`<a class="btn btn-warning text-light ml-1" href="`+data2.data[j].instagram+`"><i class="fa fa-instagram"></i></a>`)
                }
                
            }
        }

        if(data3.length>0){
            $("#listingView").append(`
                    <div class="enquiry_date mt-3" style="text-align:justify; font-weight:bold;">Services</div>
            `);
            for(k=0;k<data3.data.length;k++){
                 
                        $("#listingView").append(`
                        
                        <div class="container-fluid pt-0" style="text-align:justify">
                            <hr>
                            <div class="card mt-0 ">
                                <div class="card-header">
                                   <b> `+data3.data[k].name+`</b>
                                </div>
                                <div class="card-body">
                                   <b> Owner:</b><span style="text-transform:capitalize"> `+data3.data[k].ownerLastName+`&nbsp`+data3.data[k].ownerFirstName+`</span><br/>
                                   <b> Address:</b> `+data3.data[k].address+`<br/>
                                    <b>City:</b> `+data3.data[k].city+`<br/>
                                    <b>State:</b> `+data3.data[k].state+`<br/>
                                    <b>Country:</b> `+data3.data[k].country+`<br/><br/>
                                    <b>Services<br/> `+data3.data[k].services+`<br/></b><br/>
                                    <b>Business Description</b><br/> `+data3.data[k].description+`<br/><br/>
                                    <b>How can you support this business</b><br/> `+data3.data[k].support+`<br/>
                                </div>
                                <div class="card-footer" id="cardfooterse`+k+`">
                                    <a class="btn btn-warning text-light" href="mailto:`+data3.data[k].email+`"><i class="fa fa-envelope"></i></a>                                    
                                    <a class="btn btn-warning text-light" href="tel:`+data3.data[k].phone+`"><i class="fa fa-phone"></i></a>
                                </div>
                          </div>
                        </div>
                    
                    `);

                    if(data3.data[k].website!="Unspecified"){
                        $("#cardfooterse"+k).append(`<a class="btn btn-warning text-light" href="`+data3.data[k].website+`"><i class="fa fa-globe"></i></a>`)
                    }
                    if(data3.data[k].twitter!="Unspecified"){
                        $("#cardfooterse"+k).append(`<a class="btn btn-warning text-light ml-1" href="`+data3.data[k].twitter+`"><i class="fa fa-twitter"></i></a>`)
                    }
                    if(data3.data[k].facebook!="Unspecified"){
                        $("#cardfooterse"+k).append(`<a class="btn btn-warning text-light ml-1" href="`+data3.data[k].facebook+`"><i class="fa fa-facebook"></i></a>`)
                    }
                    if(data3.data[k].instagram!="Unspecified"){
                        $("#cardfooterse"+k).append(`<a class="btn btn-warning text-light ml-1" href="`+data3.data[k].instagram+`"><i class="fa fa-instagram"></i></a>`)
                    }
                  
                  
            }
        }

    }
    else{
        $("#listingView").html(`
        <button id="listingSearchBack" class="btn btn-danger">Back</button>
        <div class="empty_message">Oops!, couldn't find what you were looking for.</div>
    `);
    
    $("#listingSearchBack").click(function(){
        loadListing(sessionStorage.getItem("pageNumListing"));
    })
    
    }
    
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
