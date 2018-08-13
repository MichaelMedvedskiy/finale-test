function fillSeparateTitle(data,quill){

  var Preview = $('#preview');
  var li = $('<li></li>');
  li.addClass('case').text(data.title);
  li.click(function(){
      console.log("full data: ", data);
    chosenID = data._id;
    $('#titleInput').val(data.title);
    console.log("here is the datacontent: ",data.content);
    quill.setContents(JSON.parse(data.content));
    imageNameChosen = data.imgName;
    setImgClasses();
    dataEnabled = data.enabled;
    setEnCheckbox();
    console.log(chosenID);
  });
  Preview.append(li);
};

function fillLineWithGivenData(data,quill){
  //console.log(data);
  for(var i = 0; i< data.length;i++){
      fillSeparateTitle(data[i],quill);
  }
  $('#preview').append($('<li></li>').addClass('createCase').click(
    function(){
      chosenID=0;
        $('.ql-editor').html('');
        $('#titleInput').val('');
    })
  );
};
