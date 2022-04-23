$(document).ready(function(){
    
    //When the back button is clicked
    $(".backlist").click(function(){
        $(".views").hide(function(){
            $(".list").fadeIn();
        });
    });

    //When the ivs button is clicked
    $("#ivs").click(function(){
        $(".list").hide(function(){
            $("#ivscontent").fadeIn();
        });
    });

    //When the cms button is clicked
    $("#cms").click(function(){
        $(".list").hide(function(){
            $("#cmscontent").fadeIn();
        });
    });

    //When the vs button is clicked
    $("#vs").click(function(){
        $(".list").hide(function(){
            $("#vscontent").fadeIn();
        });
    });

    //When the baymar button is clicked
    $("#baymar").click(function(){
        $(".list").hide(function(){
            $("#baymarcontent").fadeIn();
        });
    });

    //When the ihr button is clicked
    $("#ihr").click(function(){
        $(".list").hide(function(){
            $("#ihrcontent").fadeIn();
        });
    });

    //When the others button is clicked
    $("#others").click(function(){
        $(".list").hide(function(){
            $("#otherscontent").fadeIn();
        });
    });
});