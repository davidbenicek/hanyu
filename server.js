'use strict'
//Lib imports
var express = require('express');
var bodyParser = require('body-parser');

const vocab = require('./services/vocab');

//Start server
var app = express();
var port = Number(process.env.BACKEND_PORT || 1200);


app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  	extended: true
}));

app.get('/char', function (req, res) {
  let { level } = req.query
  if (!level) level = '1,2,3';
  let char = vocab[Math.floor(Math.random() * vocab.length)];
  while(!level.includes(char.HSK)) {
    char = vocab[Math.floor(Math.random() * vocab.length)];
  }
  res.send(char);
});

app.listen(port);
console.log("Backend server running on http://localhost:1200/")

