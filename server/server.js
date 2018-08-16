const config = require('./config/config');
const hbs = require('hbs');
const express = require('express');
var cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const {server, app} = require('./setSockets');
var {News} = require('./models/news');
var {Exhibitions} = require('./models/exhibitions');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var QuillDeltaToHtmlConverter = require('quill-delta-to-html');

hbs.registerPartials(__dirname+'/../views/partials');

hbs.registerHelper('newLinkCSS',(path)=>{
  return new hbs.SafeString( `<link rel="stylesheet" type="text/css"  href="${path}" >`);
});

hbs.registerHelper('newScript',(src)=>{
  return new hbs.SafeString( `<script src="${src}"> </script> `);
});


hbs.registerHelper('escape', function(variable) {
  return variable.replace(/(['"])/g, '\\$1');
});
app.use(fileUpload());
app.use(cookieParser());

app.set('view engine','hbs');
//app.use(bodyParser.json());
//app.use(express.static(__dirname+'/../public'));

//uploadNewsImg (adminpanel) setup


//setting up the 2 main root dirs
app.get("/",(req,res)=>{
  console.log(' The / was called');
  res.render('home.hbs');
//res.send({name:'asodigjhsdfg'});
});

app.post('/registerAdmin',(req,res)=>{

  if(req.body.secretKey!=="ITMOFOREVER") return res.status(401).send();
  var user = new User({
    login: req.body.login,
    password: req.body.password
  });
  user.save();
  res.status(200).send(user);
});

app.get('/loginToAdminpanel',(req,res)=>{
  res.render('login.hbs')
});

app.get("/adminpanel",authenticate,(req,res)=>{
  res.render('adminpanel.hbs');
});


app.post('/checkLoginPass',async function(req,res){
  try{
//    console.log("the req body: ", req.body);
  var login = req.body.login;
  var password = req.body.password;
  //console.log(login,password);
  var user = await User.loginUser(login,password);
  //console.log('THE USER: ', user);
  var token = await user.generateAuthToken();
  console.log('All was successful');

res.cookie('x-auth',token).json({
  success : "Updated Successfully",
 status : 200
});
//res.end(JSON.stringify(response));

  //res.status(200).header('x-auth',token).send();
}catch(e){
  res.status(401).send(e);
}
});
//app.post('/login')

//uploadNewsImg (adminpanel) setup


app.post('/upload/:cat', function(req, res) {
      console.log('IM IN THE NEWS IMG REQUEST');
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let newsImg = req.files.newsImg;

  // Use the mv() method to place the file somewhere on your server
  newsImg.mv(`public/media/${req.params.cat}/${req.files.newsImg.name}`, function(err) {
    if (err)
      return res.status(500).send(err);

    res.redirect('/adminpanel');
  });
});

//getting the full news route

app.get('/news/:id', async (req,res)=>{
  var newsItem = await News.findById(req.params.id);
  res.render('fullNews2.hbs',newsItem);
});

app.get('/exhibitions/:id', async (req,res)=>{
  var exItem = await Exhibitions.findById(req.params.id);
  res.render('fullExhibitions.hbs',exItem);
});

server.listen(process.env.PORT, ()=>{
  console.log(`Server is up on ${process.env.PORT}`);
});
