var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var userSchema = mongoose.Schema({
  name: String,
  user_id: String,
  urls: [{
    name: String,
    pins: [{
      content: String,
      annotations: [String]
    }]
  }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;