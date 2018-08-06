const config = require('./config/config');
const hbs = require('hbs');
const express = require('express');

app = express();
hbs.registerPartials(__dirname+'/../views/partials')
app.set('view engine','hbs')
//app.use(bodyParser.json());
app.use(express.static(__dirname+'/../public'));


app.get("/",(req,res)=>{
  console.log(' The / was called');
  res.render('home.hbs', {
    name:'Misha',
    pageTitle: '12312312'
});
//res.send({name:'asodigjhsdfg'});
});
app.get('/123',(req,res)=>{
    console.log(' The /123 was called');
  res.render('test.hbs');
});

app.listen(process.env.PORT, ()=>{
  console.log(`Server is up on ${process.env.PORT}`);
});
