var {User} = require('./../models/user');

var authenticate = async (req,res,next)=>{
  try{
    console.log("In authenticate", " Cookies: ", req.cookies);
  var token = req.cookies['x-auth'];
  console.log("the given token is: ",token);
  var user = await User.findByToken(token);
  console.log("Here is the user: ", user);
  if(!user) throw new Error('No user found with such token');
  req.user = user;
  req.token = token;

  next();
  }catch(e){
      res.status(401).send(e);
  }
};

module.exports = {authenticate};
