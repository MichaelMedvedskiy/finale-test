function setImgClasses(){
  $('.imgSelector').each(function(imgName){
    $(this).removeClass('imgSelectED');
    if($(this).text()===imageNameChosen) $(this).addClass('imgSelectED');
  });
  //$(li).addClass('imgSelectED');
}
function setEnCheckbox(){
  var check = $('#isEnabled');

  if(dataEnabled){
    check.prop('checked',true);
  }else{
    check.prop('checked',false);
  }
}
