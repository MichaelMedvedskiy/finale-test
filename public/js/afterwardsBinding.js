function afterwardsBinding(){
  $('.learnMore').each(function(){
    $(this).click(function(){
      console.log(123);
      window.location.href=`/news/${$(this).attr('id')}`;
    });
  });
};
