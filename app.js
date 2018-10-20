
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  users = require('./API/models/userModel'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  LocalStrategy = require('passport-local').Strategy;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/real_estateDB');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var userActionRoute = require('./API/routes/userRoute');
userActionRoute(app);
// app.use('/register',userActionRoute);

app.listen(port);

console.log('Real Estate Website RESTful API server started on: ' + port);