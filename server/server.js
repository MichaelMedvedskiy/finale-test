const config = require('./config/config');
const hbs = require('hbs');
const express = require('express');
const {server, app} = require('./setSockets');


hbs.registerPartials(__dirname+'/../views/partials');

hbs.registerHelper('newLinkCSS',(path)=>{
  return new hbs.SafeString( `<link rel="stylesheet" type="text/css"  href="${path}" >`);
});

hbs.registerHelper('newScript',(src)=>{
  return new hbs.SafeString( `<script src="${src}"> </script> `);
});

app.set('view engine','hbs');
//app.use(bodyParser.json());
//app.use(express.static(__dirname+'/../public'));


app.get("/",(req,res)=>{
  console.log(' The / was called');
  res.render('home.hbs');
//res.send({name:'asodigjhsdfg'});
});


server.listen(process.env.PORT, ()=>{
  console.log(`Server is up on ${process.env.PORT}`);
});
