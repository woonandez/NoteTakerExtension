var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = mongoose.Schema({
  name: String,
  password: String
});

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
