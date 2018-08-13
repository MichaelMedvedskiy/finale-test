function parseItemData(quill){
  var title = $('#titleInput').val();
  var content = quill.getContents();
  var planeContent = $('.ql-editor').text();    //get the text of element
  var enabled = Enab;
  var category = categorySelected;
  return {title,content,planeContent,chosenID,enabled,imageNameChosen,category};

}
