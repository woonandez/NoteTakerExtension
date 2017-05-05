var path = require('path');
var express = require('express');
var db = require('./database/db.js');

var Users = require('./database/models/user.js');

var app = express();

// set path for static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.send('Hello, humans!');

});

var port = 3003;

app.listen(port, () => {
  console.log(`server listening at ${port}`)
});