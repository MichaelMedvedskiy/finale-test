const mongoose = require('mongoose');

var VisitSchema = new mongoose.Schema(
  {
    timestampStart: {
      type: Number,
      required: true,
      unique: true
    },
    timestampFinish:{
      type: Number,
      required: true,
      unique: true
    },
    attendeeName:{
      type: String,
      required:true
    },
    attendeePhone:{
      type: String,
      minlength: 6,
      required: true
    },
    visitConfirmed:{
      type: Boolean,
      required:true,
      default: false
    }
  }
);

VisitSchema.statics.findDailySchedule = function(start,finish){
  try{
    return this.find({
    timestampStart  : { $gt: start-1, $lt: finish+1 },
    });
  }catch(e){
      return Promise.reject(e);
  }
};

VisitSchema.statics.findCrossing = async function(start,finish){
  var stArr = await this.find({
    timestampStart : { $lt: start},
    timestampFinish :  {$gt: start}
  });
  var endArr = await this.find({
    timestampStart : { $lt: finish},
    timestampFinish :  {$gt: finish}
  });
  if(stArr.length === 0 && endArr.length === 0) return false;
  return true;
};

VisitSchema.methods.checkIfTimeFree = async function(){
var isTaken = await Visit.findCrossing(this.timestampStart,this.timestampFinish);
 return isTaken;
};

//changing visit state
VisitSchema.methods.confirmVisit = async function(){
  this.visitConfirmed=true;
};

VisitSchema.methods.denyVisit = async function(){
  this.visitConfirmed=false;
};

VisitSchema.statics.confirmVisitByID = async function(id){
  console.log("this is id: ", id);
  var  vis = await this.findById(id);
  console.log('This is first conf: ', vis);
    await this.findByIdAndUpdate(id,{$set:{
    visitConfirmed:true
  }});

  var  vis = await this.findById(id);
  console.log('This is sec conf: ', vis);
};

VisitSchema.statics.denyVisitByID = async function(id){
 await this.findByIdAndUpdate(id,{$set:{
    visitConfirmed:false
  }});

};

var Visit = mongoose.model('Visit',
VisitSchema
);

module.exports = {Visit};
