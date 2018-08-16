const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      minlength: 6,
      unique: true
    },
    password:{
      type: String,
      required: true,
      minlength: 10
    },
    tokens: [{
      access:{
        type: String,
        required: true
      },
      token:{
        type: String,
        required:true
      }
    }]
  }
);

//
// UserSchema.methods.toJSON

UserSchema.pre('save', function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});

UserSchema.statics.loginUser = async function(login, password){
  var User = this;
  var userf = await User.findOne({login});
//console.log(userf);
  if(!userf) Promise.reject();
//  console.log('Log: ',login, "Pass: ", password);
  //console.log('UF pass: ', userf);
    return new Promise((resolve,reject)=>{
      bcrypt.compare(password, userf.password, async function(err,res){

      if(res){
        resolve(userf);
      }else{
        reject();
      }

  });
    });

}
UserSchema.methods.generateAuthToken =  async function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
  user.tokens = user.tokens.concat([{access,token}]);
  await user.save();
  return token;
};


UserSchema.statics.findByToken = async function(token){
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log("The decoded: ",decoded);
  }catch(e){
    return Promise.reject(e);
  }
  return await User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('user',
UserSchema
);

module.exports = {User};
