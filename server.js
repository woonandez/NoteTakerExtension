var path = require('path');
var express = require('express');
var db = require('./database/db.js');
var bodyParser = require('body-parser');
var User = require('./database/models/user.js');

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

app.get('/api/users', function(req, res) {
  User.user.find((err, users) => {
    if(err) {
      console.error(err);
    } else {
      res.send(users);
    }
  });
});

app.post('/api/users', (req, res) => {
  User.addUser(req.body.name, req.body.password, req.body.uri, req.body.notes);

  res.status(201).send('Post Success');
});

var port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`server listening at ${port}`)
});