var data = {
  "exhibitions": [
    {
      "imgName": "first.jpg",
      "title": "test123",
      "infoText" : "text text text text text text"
    },{
      "imgName": "second.jpeg",
      "title": "test322",
      "infoText" : "The nature is beautiful today, isn't it?"
    },{
      "imgName": "second.jpeg",
      "title": "test322",
      "infoText" : "The nature is beautiful today, isn't it?"
    },{
      "imgName": "second.jpeg",
      "title": "ajkshbguisdahgbnuisguisd",
      "infoText" : "The nature is beautiful today, isn't it?"
    }


  ],
  "news": [
    {
      "imgName": "news1.jpg",
      "newsTag": "Первая новость",
      "newsTitle": "12312312",
      "newsContent": "Самый, по-видимому, краткий в мировой литературе пример текста повествования – знаменитый рассказ Цезаря: «Пришёл, увидел, победил». ... Повествование может быть более или менее объективированным, нейтральным, или, напротив, субъективным, пронизанным авторскими эмоциями."
    },
    {
      "imgName": "news2.jpg",
      "newsTag": "Первая новость",
      "newsTitle": "12312312",
      "newsContent": "Самый, по-видимому, краткий в мировой литературе пример текста повествования – знаменитый рассказ Цезаря: «Пришёл, увидел, победил». ... Повествование может быть более или менее объективированным, нейтральным, или, напротив, субъективным, пронизанным авторскими эмоциями."
    },
    {
      "imgName": "news3.jpg",
      "newsTag": "Первая новость",
      "newsTitle": "12312312",
      "newsContent": "Самый, по-видимому, краткий в мировой литературе пример текста повествования – знаменитый рассказ Цезаря: «Пришёл, увидел, победил». ... Повествование может быть более или менее объективированным, нейтральным, или, напротив, субъективным, пронизанным авторскими эмоциями."
    }
  ],
  "questions": [
    {
      "q":"Первый вопрос",
      "a":"Первый ответ"
    },{
      "q":"Второй вопрос",
      "a":"Второй ответ"
    },{
      "q":"Третий вопрос",
      "a":"Третий ответ"
    },{
      "q":"Четвертый вопрос",
      "a":"Четвертый ответ"
    }
  ]
};

$(document).ready(function(){


// Inflating exhibitions
  var exTemplate = $('#exhibition-template').html();

  var compiledExTemplate = Handlebars.compile(exTemplate);

    $('#exhibitionsArea').append(compiledExTemplate(data));

//Inflating news
    var compiledNewsTemplate = Handlebars.compile($('#news-template').html());

    $('#newsWrapper2').append(compiledNewsTemplate(data));

//Inflating questions

    var compiledQuestionTemplate = Handlebars.compile($('#questions-template').html());

    $('.popularQuestionsArea').append(compiledQuestionTemplate(data));
      //Adding script animations to questions
    toggleQuestions();
});
