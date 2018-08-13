var data = {


  // "questions": [
  //   {
  //     "q":"Первый вопрос",
  //     "a":"Первый ответ"
  //   },{
  //     "q":"Второй вопрос",
  //     "a":"Второй ответ"
  //   },{
  //     "q":"Третий вопрос",
  //     "a":"Третий ответ"
  //   },{
  //     "q":"Четвертый вопрос",
  //     "a":"Четвертый ответ"
  //   }
  // ]
};

function loadTemplateData(){


// Inflating exhibitions
  var exTemplate = $('#exhibition-template').html();

  var compiledExTemplate = Handlebars.compile(exTemplate);

    $('#exhibitionsArea').append(compiledExTemplate(data));

//Inflating news
    var compiledNewsTemplate = Handlebars.compile($('#news-template').html());
    console.log(data);
    $('#newsWrapper2').append(compiledNewsTemplate(data));

//Inflating questions

    var compiledQuestionTemplate = Handlebars.compile($('#questions-template').html());

    $('.popularQuestionsArea').append(compiledQuestionTemplate(data));
      //Adding script animations to questions
    toggleQuestions();
    afterwardsBinding();
};
