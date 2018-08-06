$( document ).ready(function() {
    
    $(".nav-toggle").click(function(){
        if($(".main-header").position().left!='0'){
            $(".main-header").animate({left: '0px'});
            $(this).animate({left: '55%'});
            console.log($(".main-header").css('left')!='0');
        }else{
            $(".main-header").animate({left: '-50%'});
            $(this).animate({left: '5%'});
            
        }
        
    });



    


});