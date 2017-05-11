var path = require('path');
var express = require('express');
var db = require('./database/db.js');
var bodyParser = require('body-parser');
var handle = require('./server/requestHandler.js')
var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, DELETE, POST, GET, UPDATE");
  next();
});

//WEB APP ENDPOINTS//
app.get('/', function(req, res) {
  res.send('Hello, humans!');
});

app.get('/api/users', handle.usersGet);
app.post('/api/users', handle.userPost);

app.delete('/api/users/urls', handle.urlRemove);
app.delete('/api/users/notes', handle.noteRemove);

//CHROME EXTENSION ENDPOINTS//
//EX.axios => /api/users/notes/5913c8501b7eaa3f1403fc4c 
app.post('/api/users/notes/', handle.userAddNotes);

//DAVID will fill in the blanks with Auth0//
app.post('/login', handle.userLogin);
app.post('/signup', handle.userSignup);

var port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`server listening at ${port}`)
});