var socket = io();




$( document ).ready(function() {

  fillTimeline();
  setSubmitRecord();

  window.addEventListener("error", function (e){
  generateErrorMessage(e);
  }
);
});

//get full TimeLine

function getTimeline(){
  return $('.timelineLI').toArray();
}


//set timeline anavalible






//Socket setup
socket.on('connect',function(){
  var ul = jQuery('<ul></ul>').attr('id','calendarUL');
  jQuery('#calendar').append(ul);

  socket.emit('getAllData',function(obj){
    console.log(obj);
    var result = {};
for(var key in data) result[key] = data[key];
for(var key in obj) result[key] = obj[key];
console.log(result);
    data = result;
    loadTemplateData();
  });
  socket.emit('getDaysInMonth', calendarDate);

});


socket.on('dayMonth',function(body){


  var dayN = body.dayN;
  console.log("The dayn: ",dayN);
  $('#monthYear').text( body.monthYear);
  var ul = jQuery('#calendarUL');
  ul.empty();


  for(var i = 1;i<=dayN;i++){
    li = jQuery('<li></li>').text(i).attr('class', 'calendarLI');

    ul.append(li);


  }


  ul.unbind('click');

  ul.click(function(e){
    if(e.target.nodeName==='LI'){
//      try{
        //  console.log('ckicked calendar');
        var txt = $(e.target).text();
        //Setting the dayChosen Global var
        dayChosen = Number(txt);

        //console.log(moment(calendarDate).add(Number(txt)-1,'days'));
        borderTarget(e.target);
          socket.emit('getDailyVisits',{
            day:moment(calendarDate).add(dayChosen-1,'days')
          });

      // }catch(){
      //   console.log('An error occured, plesae reload the page');
      // }

    }
  });



});

socket.on('dayVisit',
function(body2){

  var {visitList} = body2;

$('.timelineLI').each(function(index){


  var fullTimestamp = timelineArray[index].generateFullTimestamp();

  timelineArray[index].setStatus(2);

  for(var j=0; j<visitList.length;j++){
    var visit = visitList[j];
      var timelineBlockTimestamp = timelineArray[index].generateFullTimestamp();
console.log('Before if');

if( (timelineBlockTimestamp>=visit.timestampStart && timelineBlockTimestamp<visit.timestampFinish) && visit.visitConfirmed===true){
timelineArray[index].status=1;
}




}

// console.log('calling setTimelineClasses from fillTimeline');


});
//console.log('The timelineArray : ',timelineArray);

setTimelineClasses();








}

);



//filling days
// socket.on('generateMonthCalendar',function(body){
//
//
//
// });



socket.on('timeTaken',function(e){
  if(e) {throw new Error(e);}else{
  throw new Error('Это время уже занято, выберите другое.');}
});

socket.on('savedSuccessfully',function(){

  generateConfirmMessage('Ваше время записано!');
});

socket.on('dataUpdated',function(){
  socket.emit('getDailyVisits',{
    day:moment(calendarDate).add(dayChosen-1,'days')
  });
});

  //
  // visitList.forEach(function(visit){
  //   var visitMinutesStart = Number(moment(visit.timestampStart).format('HH'))*60 +  Number(moment(visit.timestampStart).format('mm'));
  //   var visitMinutesFinish = Number(moment(visit.timestampFinish).format('HH'))*60 + Number(moment(visit.timestampFinish).format('mm'));
  //
  //   console.log(visitMinutesStart, visitMinutesFinish);
  //
  //     console.log(timelineBlockMinutes);
  //     //for now - all re avalible
  //
  //     if(timelineBlockMinutes>=visitMinutesStart && timelineBlockMinutes<visitMinutesFinish){
  //
  //
  //
  //     }
  //     setTimelineClasses(timelineLI);
  //   });







  //
  //   var li = jQuery('<li></li>').addClass('timelineLIUnaval');
  //   var time = (fillMoment).add(30,'minute').format('HH : mm');
  // li.text(time);
  // console.log(time);

  //  $('#timeline').append(li);



//  var li = jQuery('<li></li>').text('ooo');


  //
  //
  // $('#timeline').append(li);
//});
