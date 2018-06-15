"use strict"
var express = require('express');
var app = express();

var sto = require('sto-api');
console.log("The Star Trek Online open world is : " + sto('status'));

app.use('/', express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendFile('index.html');
});

//port for heroku
let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
