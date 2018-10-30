'use strict'
//Lib imports
var express = require('express');
var bodyParser = require('body-parser');
const cmd = require('node-cmd');

const vocab = require('./services/vocab');

//Start server
var app = express();
var port = Number(process.env.BACKEND_PORT || 1200);

cmd.run('cd client && npm start');


app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  	extended: true
}));

app.get('/char', function (req, res) {
  const { level } = req.query
  let char = vocab[Math.floor(Math.random() * vocab.length)];
  console.log(level, char.HSK);
  if(level)
    while(!level.includes(char.HSK)) {
      char = vocab[Math.floor(Math.random() * vocab.length)];
      console.log(level, char.HSK);
    }
  res.send(char);
});

app.listen(port);
console.log("Backend server running on http://localhost:1200/")

