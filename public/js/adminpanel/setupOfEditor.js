$(document).ready(function(){


  //setting news filler data
      var toolbarOptions = [

        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],
    ['link', 'image']

      ];

        var quill = new Quill('#editor', {
        modules: {
          toolbar: toolbarOptions
        },
        theme: 'snow'
      });

      setListeners();

      $('#saveButton').click(function(){
     var itemData = parseItemData(quill);
     console.log("here is item data : ",itemData, Enab);

        socket.emit('saveItem',itemData);
    });




    function emitDataRequest(){
      // Emptying the fields
      $('#imgNames').empty();
      $('#preview').empty();
      chosenID=0;

      //setting the upload form url

// TODO: CHANGE THIS TO DYNAMIC
      $('#uploadForm').attr('action',`/upload/${categorySelected}`);


      socket.emit('getTitles',{categorySelected},function(obj){
          fillLineWithGivenData(obj.allData,quill);
      });

      //filling img names for choice

      socket.emit('fillFileNames',{categorySelected},
      function(namesArray){
        console.log(namesArray);
        var imgNames = $('#imgNames');
        for(i=0;i<namesArray.length;i++){
          var li = $('<li></li>');
          li.text(namesArray[i]);
          li.click(function(){
            console.log($(this).text());
            imageNameChosen = $(this).text();
            setImgClasses();
          });
          li.addClass('imgSelector');

          console.log(li);
          imgNames.append(li);
        }

      });
    }


    $('#selectNews').click(function(){
      categorySelected = "news";

      $('.codeName').text('Новости');
        //filling news line

        emitDataRequest();


    });



    $('#selectExhibitions').click(function(){
      categorySelected = "exhibitions";

      $('.codeName').text('Выставки');
        //filling news line

        emitDataRequest();


    });
    $('#selectQuestions').click(function(){
      categorySelected = "questions";

      $('.codeName').text('Вопросы');
        //filling news line

        emitDataRequest();


    });

});
