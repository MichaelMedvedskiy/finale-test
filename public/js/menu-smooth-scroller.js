
function getPosition(elementName) {

    return $('#'+elementName).offset().top-80;
};

var setScroll = (buttonID, elementID)=>{



    $(buttonID).click(
      ()=>{
        // document.getElementById(elementID).scrollIntoView( {
        //   behavior: 'smooth'
        // });

        window.scroll({
          top: getPosition(elementID),
          left: 0,
          behavior: 'smooth'
        });

      }
    );



};



$(document).ready(()=>{

setScroll('#info','myVideo');
setScroll('#exhibitions', 'exSPAN');
setScroll('#tickets','tiSPAN');
setScroll('#news','neSPAN');
setScroll('#questions','poSPAN');

});
