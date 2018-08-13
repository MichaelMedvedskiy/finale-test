const config = require('./config/config');
const hbs = require('hbs');
const express = require('express');
const fileUpload = require('express-fileupload');
const {server, app} = require('./setSockets');
var {News} = require('./models/news');
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

app.get("/adminpanel",(req,res)=>{
  res.render('adminpanel.hbs');
});


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

  //newsItem.content = JSON.parse(newsItem.content);
   //console.log(JSON.parse(newsItem.content));
   // var convertor = new QuillDeltaToHtmlConverter(JSON.parse(newsItem).ops,{});
   // console.log("The quill delta: ", newsItem.content, "\nIts html: ", convertor.convert());
  // console.log(newsItem.content);
  //  console.log(newsItem);

  res.render('fullNews2.hbs',newsItem);
  //res.send(newsItem);
});

server.listen(process.env.PORT, ()=>{
  console.log(`Server is up on ${process.env.PORT}`);
});
