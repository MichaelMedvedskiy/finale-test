const mongoose = require('mongoose');
const Moment = require('../libs/moment.js');

var ExSchema = new mongoose.Schema(
  {
    imgName: {
      type: String,
      required: true,
      minlength:3,
      trim: true
    },
    title: {
      type: String,
      required: true,
      minlength: 7,
      trim: true
    },
    content: {
      type: String,
      required: true,
      minlength: 10
    },
    planeContent:{
      type: String,
      required: true,
      minlength: 10
    },
    createdTimestamp: {
      type: Number,
      required: true
    },
    enabled: {
      type: Boolean,
      default: true
    }
  }
);




ExSchema.statics.saveTitleContent = async function(obj){
  //  console.log("Here is qreaded: ",new QuillDeltaToHtmlConverter(obj.content,{}).convert());
var Ex = this;
var exObj = new Ex({
  imgName:obj.imageNameChosen,
  title: obj.title,
  content:JSON.stringify(obj.content),
  planeContent: obj.planeContent.substring(0,140)+'...',
  createdTimestamp: (new Moment()).valueOf(),
  enabled:obj.enabled

});
try{
  return await exObj.save();

}catch(e){
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
 return  Promise.reject(e);
}



};


ExSchema.statics.modifyObjectById = async function(obj){
  var Ex = this;

  try{
  await  Ex.findByIdAndUpdate(obj.chosenID,  {$set:{
    title: obj.title,
    content: JSON.stringify(obj.content),
    planeContent:obj.planeContent.substring(0,140)+'...',
    enabled: obj.enabled,
    imgName: obj.imageNameChosen
  }});
  // var news = await  News.findById(obj._id);
  // news.set({title: obj.title, content: obj.content});
  // console.log(news);
  // News.update({_id: obj._id}, {
  //   $set:{title: obj.title, content: obj.content}
  // });
  }catch(e){
    console.log(e);
   return  Promise.reject(e);
  }

};

ExSchema.statics.generateFrontEx = async function(){
  var allActiveEx = await this.find({enabled:true});
  return allActiveEx;
}

var Exhibitions = mongoose.model('Exhibitions',ExSchema);

module.exports = {Exhibitions};
