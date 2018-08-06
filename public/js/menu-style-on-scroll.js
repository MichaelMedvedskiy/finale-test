$( document ).ready(function() {
  $(".main-header").css({
              "background": "rgba(0,0,0,0)"
          });
});

$(window).scroll(function(){

var a = 112;
var pos = $(window).scrollTop();
if(!(pos > a)) {
    $(".main-header").css({
                "background": "rgba(0,0,0,0)"
            });
}
else {
    $(".main-header").css({
                "background" : "rgb(25,40,77)"
            });
}
});
