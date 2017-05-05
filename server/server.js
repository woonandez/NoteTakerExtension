var path = require('path');
var express = require('express');

var app = express();

// set path for static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.send('Hello, humans!');

});

app.get('/users', function(req, res) {
  res.send('hi')
});

var port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`server listening at ${port}`)
});