const express = require('express')
const bodyParser = require('body-parser');
const path=require("path")
 const request = require('request');
const morgan=require('morgan') 
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index',{weather:null,error:null});;
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let apiKey = "6599c6412c634411b335037ede47accf"
  let url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey
  console.log(url);
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = "It's "+weather.main.temp+" degrees in "+weather.name+"!";
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
app.listen(3000, function () {
  console.log('Example app listening on port 3001!')
})