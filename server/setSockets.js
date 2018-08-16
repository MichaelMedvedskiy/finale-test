
const config = require('./config/config');
const socketIO = require('socket.io');
const express = require('express');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const moment = require('./libs/moment');
var {Visit} = require('./models/visit');
var {News} = require('./models/news');
var {Exhibitions} = require('./models/exhibitions');
var {Questions} = require('./models/questions');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
moment.locale('ru');
const fs = require('fs');

var app = express();



const path = require('path');
const http = require('http');


var server = http.createServer(app);
var io = socketIO(server);


const publicPath = path.join(__dirname, './../public');


app.use(bodyParser.json());
app.use(express.static(publicPath));




io.on('connection', (socket)=>{

socket.on('getAllData',async (fn)=>{
  var data = {};
  data.news = await News.generateFrontNews();
  data.exhibitions = await Exhibitions.generateFrontEx();
  data.questions = await Questions.generateFrontQ();
  fn(data);
});


socket.on('getDaysInMonth',function(timestamp){

//  console.log(timestamp);
    date=moment(timestamp);
  //  date.locale(ru);
    dayN = date.daysInMonth();
    monthYear = date.format('MMMM YYYY').toUpperCase();
    console.log('Before fn');
    socket.emit('dayMonth',{dayN, monthYear});
});

socket.on('getDailyVisits',async (body,fn)=>{
  console.log(body.day.valueOf());
  milliStart = moment(body.day).valueOf();
  milliFinish = moment(body.day).add(1,'day').valueOf();
  console.log('st: ', milliStart, ' fin: ', milliFinish);
  var visitList = (await Visit.findDailySchedule(milliStart,milliFinish));
  if(visitList.length!==0) console.log('THERE IS', visitList);
  socket.emit('dayVisit', {visitList});
});

socket.on('recordVisit', async (saveObject)=>{
  var visit = new Visit({
    timestampStart: saveObject.timestampStart,
    timestampFinish: saveObject.timestampFinish,
    attendeeName: saveObject.name,
    attendeePhone: saveObject.phone
  });

  console.log('The visit : ', visit);

var isTaken = await visit.checkIfTimeFree();
console.log('The isTaken: ',isTaken);

  if(isTaken){
    return socket.emit('timeTaken');
  }else{

  try{
    await visit.save();
  }catch(e){
    console.log('THE ERROR WHILE SAVING: ',e);
   return socket.emit('timeTaken',e);
  }

socket.emit('savedSuccessfully',{
    timestampStart: saveObject.timestampStart,
    timestampFinish: saveObject.timestampFinish,
    attendeeName: saveObject.name,
    attendeePhone: saveObject.phone
  });
  return io.emit('dataUpdated');
}

});


// Sockets for admin panel

socket.on('saveItem',async function(itemData){
console.log(itemData);
try{

  if(itemData.category==="news"){
  if(itemData.chosenID===0){
await News.saveTitleContent(itemData);
socket.emit('actionSuccessful','Успешно сохранили новость');
}else{
  await News.modifyObjectById(
itemData
);

  socket.emit('actionSuccessful','Успешно модифицировали новость');
}
}else if(itemData.category === "exhibitions"){
  if(itemData.chosenID===0){
await Exhibitions.saveTitleContent(itemData);
socket.emit('actionSuccessful','Успешно сохранили выставку');
}else{
  await Exhibitions.modifyObjectById(

itemData
);

  socket.emit('actionSuccessful','Успешно модифицировали выставку');
}
}else if(itemData.category==="questions"){

  if(itemData.chosenID===0){
await Questions.saveTitleContent(itemData);
socket.emit('actionSuccessful','Успешно сохранили вопрос');
}else{
  await Questions.modifyObjectById(

itemData
);

  socket.emit('actionSuccessful','Успешно модифицировали вопрос');
}

}
}catch(e){
  console.log(e);
      socket.emit('newsSaveError',e);
}

});

socket.on('getTitles',async function(obj,fn){
  category = obj.categorySelected;
  if(category ==="news"){
  var allData = await News.find({});
}else if(category ==="exhibitions"){
  var allData = await Exhibitions.find({});

}else if(category==="questions"){
    var allData = await Questions.find({});
}
fn({allData});

});

socket.on('fillFileNames',async function(obj,fn){
  var namesArray = [];
  var category = obj.categorySelected;
  if(category==="questions"){ fn(namesArray);
  }else{
  fs.readdirSync(`public/media/${category}`).forEach(file => {

    namesArray.push(file);
  });
      console.log(namesArray);
  fn(namesArray);
  }
});

//getting all visits

socket.on('fillVisits', async function(fn){
  var visits = await Visit.find({});
  fn(visits);
});

//visit manipulation from adminpanel
socket.on('setVisitAccepted',async function(obj){
  await Visit.confirmVisitByID(obj.id);
});

socket.on('setVisitDenied',async function(obj){
  await Visit.denyVisitByID(obj.id);
});




socket.on('deleteVisit', async function(obj){
  await Visit.findByIdAndDelete(obj.id);
})
});



module.exports = {server,app};
