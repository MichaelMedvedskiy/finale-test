$(document).ready(()=>{
var allContentChildren = $('.allContent').children();
console.log(allContentChildren);
for(var i=0; i<allContentChildren.length; i+=2 ){


  allContentChildren[i].style.background = "#fafafa";

}

//So the space between questions area and footer wasn't different colors
//$('body').css('background-color',"#f9f9f9");

});
