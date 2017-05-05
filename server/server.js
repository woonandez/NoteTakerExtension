var path = require('path');
var express = require('express');



var app = express();



// set path for static files
app.use(express.static(path.join(__dirname, '/www')));

app.get('/', function(req, res) {
  res.send('Hello, humans!');

});

var port = 3003;

app.listen(port, () => {
  console.log(`server listening at ${port}`)
});