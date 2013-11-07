var forward = require('./forward.js');

var express = require('express');
var app = express();
app.use(express.logger());
console.log("__dirname: " + __dirname)
app.use(express.static(__dirname + '../../www'));

// instantiate `app` et al
var target_url = "cloudant.com/troubletickets"
app.use(forward(/\/troubletickets\/(.*)/, target_url));

app.listen(3000);
