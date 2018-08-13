const mongoose = require('mongoose');
var QuestionsSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      minlength: 7,
      trim: true
    },
    content:{
      type: String,
      required: true,
      minlength: 3
    },
    planeContent:{
      type: String,
      required: true,
      minlength: 3
    },
    enabled: {
      type: Boolean,
      default: true
    }
  }
);







QuestionsSchema.statics.saveTitleContent = async function(obj){
  //  console.log("Here is qreaded: ",new QuillDeltaToHtmlConverter(obj.content,{}).convert());
var Questions = this;
var questObj = new Questions({
  title: obj.title,
  content: JSON.stringify(obj.content),
  planeContent:obj.planeContent,
  enabled:obj.enabled

});
try{
  return await questObj.save();

}catch(e){
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
 return  Promise.reject(e);
}



};


QuestionsSchema.statics.modifyObjectById = async function(obj){
  var Questions = this;

  try{
  await  Questions.findByIdAndUpdate(obj.chosenID,  {$set:{
    title: obj.title,
    content:JSON.stringify(obj.content),
    planeContent:obj.planeContent,
    enabled: obj.enabled
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

QuestionsSchema.statics.generateFrontQ = async function(){
  var allActiveQuestions = await Questions.find({enabled:true});
  for(var i = 0;i<allActiveQuestions.length;i++){
    console.log('cont: ', allActiveQuestions[i].content, ' planeCont: ',allActiveQuestions[i].planeContent);
    allActiveQuestions[i].content = allActiveQuestions[i].planeContent;
    //allActiveQuestions[i].planeContent=null;
  }
  return allActiveQuestions;
}

var Questions = mongoose.model('Questions',QuestionsSchema);

module.exports = {Questions};
