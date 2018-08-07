
const config = require('./config/config');
const socketIO = require('socket.io');
const express = require('express');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const moment = require('./libs/moment');
var {Visit} = require('./models/visit');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
moment.locale('ru');


var app = express();



const path = require('path');
const http = require('http');


var server = http.createServer(app);
var io = socketIO(server);


const publicPath = path.join(__dirname, './../public');


app.use(bodyParser.json());
app.use(express.static(publicPath));




io.on('connection', (socket)=>{

socket.on('getDaysInMonth',(timestamp)=>{
//  console.log(timestamp);
    date=moment(timestamp);
  //  date.locale(ru);
    dayN = date.daysInMonth();
    monthYear = date.format('MMMM YYYY').toUpperCase();
    socket.emit('generateMonthCalendar',{   dayN, monthYear    });
});

socket.on('getDailyVisits',async (body)=>{
  console.log(body.day.valueOf());
  milliStart = moment(body.day).valueOf();
  milliFinish = moment(body.day).add(1,'day').valueOf();
  console.log('st: ', milliStart, ' fin: ', milliFinish);
  var visitList = (await Visit.findDailySchedule(milliStart,milliFinish));
  if(visitList.length!==0) console.log('THERE IS', visitList);
  socket.emit('fillTimeline', {visitList});
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




});

module.exports = {server,app};
