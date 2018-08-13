const mongoose = require('mongoose');
const Moment = require('../libs/moment.js');

var NewsSchema = new mongoose.Schema(
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

NewsSchema.statics.getAllTitles = async function(){
  var News = this;
  var newsTitles = await News.find({}).map(n => n.title);
  return newsTitles;
};



NewsSchema.statics.saveTitleContent = async function(obj){
  //  console.log("Here is qreaded: ",new QuillDeltaToHtmlConverter(obj.content,{}).convert());
var News = this;
var newsObj = new News({
  imgName:obj.imageNameChosen,
  title: obj.title,
  content:JSON.stringify(obj.content),
  planeContent: obj.planeContent.substring(0,140)+'...',
  createdTimestamp: (new Moment()).valueOf(),
  enabled:obj.enabled

});
try{
  return await newsObj.save();

}catch(e){
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
 return  Promise.reject(e);
}



};


NewsSchema.statics.modifyObjectById = async function(obj){
  var News = this;

  try{
  await  News.findByIdAndUpdate(obj.chosenID,  {$set:{
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

NewsSchema.statics.generateFrontNews = async function(){
  var allActiveNews = await News.find({enabled:true});
  return allActiveNews;
}

var News = mongoose.model('News',NewsSchema);

module.exports = {News};
