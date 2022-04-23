//const  apiurl  = "http://127.0.0.1/idealhr/API/";
//const  apiurl  = "http://127.0.0.1/portfolio/blog/API/";
//const  apiurl  = "https://hrideal.com/osegbuecharles/API/";
const  apiurl  = "https://osegbuecharles.com/blog/API/";





//API call for login into admin portal
function loginApi(email,password){
    var settings = {
        "url": apiurl+"login/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "email": email,
          "password": password
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
}



//API call for new blog comment
async function newCommentApi(name,comment,blogId){
    var settings = {
        "url": apiurl+"newComment/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "name":name,
          "comment":comment,
          "blogId":blogId
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
  }
  
  
  //API call to get comments for blog
  async function getCommentApi(blogId){
    var settings = {
        "url": apiurl+"getComment/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          
          "value":blogId
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
  }
  
  
  //API call to get info for all blogs
  async function getBlogInfoApi(pageNum,pageSize){
    var settings = {
        "url": apiurl+"blogInfo/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "criteria":"all",
          "pageNum":pageNum,
          "pageSize":pageSize
        }
      };
          return new Promise(resolve => {
              
        $.ajax(settings).done(function (response,status) {            
            resolve(response);
            
          });
    });
  }
  
  //API call to get info for all blogs
  async function searchBlogInfoApi(criteria,value){
  var settings = {
      "url": apiurl+"blogInfo/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "criteria":criteria,
        "value":value
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
  }
  
  
  //API call to like a blog
  async function likeBlogApi(blogId){
    list= localStorage.getItem("likedList");
    if(list==null){
      q=[];
      q[blogId]="true"
      li=JSON.stringify(q);
      //console.log(blogId);
      //console.log(q);
      localStorage.setItem("likedList",li);
    }
    else{
      li=JSON.parse(list);
      li[blogId]="true";
      
      localStorage.setItem("likedList",JSON.stringify(li));
    }
  
    var settings = {
        "url": apiurl+"likeBlog/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "value":blogId
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
  }
  
  //API call to view a blog
  async function viewBlogApi(blogId){
  
  var settings = {
      "url": apiurl+"viewBlog/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "value":blogId
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
  }
  
  
  //API call to share a blog
  async function shareBlogApi(blogId){
    var settings = {
        "url": apiurl+"shareBlog/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          
          "value":blogId
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
  }
  
  
  //API call to create a blog
  async function createBlogApi(email,password,author,subject,meta,image,dateCreated,category,tags,content){
  var settings = {
      "url": apiurl+"createBlog/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email":email,
        "password":password,
        "author":author,
        "subject":subject,
        "meta": meta,
        "image": image,
        "dateCreated":dateCreated,
        "category":category,
        "tags":tags,
        "content":content
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
  }
  
  
  //API call to update a blog
  async function updateBlogApi(email,password,blogId,author,subject,meta,image,dateCreated,category,tags,content){
  var settings = {
      "url": apiurl+"updateBlog/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email":email,
        "password":password,
        "blogId":blogId,
        "author":author,
        "subject":subject,
        "meta": meta,
        "image": image,
        "dateCreated":dateCreated,
        "category":category,
        "tags":tags,
        "content":content
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
  }
  
  
  //API call to delete a blog
  async function deleteBlogApi(email,password,blogId){
  var settings = {
      "url": apiurl+"deleteBlog/index.php",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": {
        "email":email,
        "password":password,
        "blogId":blogId        
      }
    };
        return new Promise(resolve => {
      $.ajax(settings).done(function (response,status) {
          //console.log(status);
          resolve(response);
        });
  });
  }
  
  
  //API call to get categories and tags
  async function getExtrasApi(criteria){
    var settings = {
        "url": apiurl+"getExtras/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "criteria":criteria
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
    }
    
  
    //API call to get Image
  async function getImageApi(){
    var settings = {
        "url": apiurl+"getImage/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {        
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
    }
  
      //API call to delete Image
  async function deleteImageApi(email,password,id){
    var settings = {
        "url": apiurl+"deleteImage/index.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {        
          "email": email,
          "password": password,
          "id": id
        }
      };
          return new Promise(resolve => {
        $.ajax(settings).done(function (response,status) {
            //console.log(status);
            resolve(response);
          });
    });
    }
  
  
  