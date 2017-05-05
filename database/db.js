var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 

var MONGODB_URI = 'mongolab-amorphous-29421' || 'mongodb://127.0.0.1:27017/NoteExtension';
mongoose.connect('mongodb://heroku_sz03msp8:f8dr4mvag1ke4iuaabbc4hna17@ds133221.mlab.com:33221/heroku_sz03msp8', options);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('connected to database');
});

module.exports = db;
