var path = require('path');
var express = require('express');
var db = require('./database/db.js');
var bodyParser = require('body-parser');
var handle = require('./server/requestHandler.js')

var app = express();

app.use(bodyParser.json());
// set path for static files
app.use(express.static(path.join(__dirname, '/public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, DELETE, POST, GET, UPDATE");
  next();
});

app.get('/', function(req, res) {
  res.send('Hello, humans!');
});

app.get('/api/users', handle.usersGet);

app.post('/api/users', handle.userPost);

var port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`server listening at ${port}`)
});