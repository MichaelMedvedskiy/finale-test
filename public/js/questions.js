$(document).ready(function(){

$('.a').each((i,item)=>{$(item).hide();});

    $(".questionArea").click((event) =>{
      if($(event.target).next().is(":visible") && $(event.target).attr('class') === 'q'){
        $(event.target).next().slideUp();
      } else {
        $(event.target).next().slideDown();
      }
    });

});










