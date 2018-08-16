function afterwardsBinding(){
  $('.learnMore').each(function(){
    $(this).click(function(){
      console.log(123);
      window.location.href=`/news/${$(this).attr('id')}`;
    });
  });

  $('.learnMoreExhibition').each(function(){
    $(this).click(function(){
      console.log(123);
      window.location.href=`/exhibitions/${$(this).attr('id')}`;
    });
  });

};
