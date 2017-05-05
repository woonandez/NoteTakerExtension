var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  name: String,
  password: String
});

var User = mongoose.model('User', userSchema);

// You can use this to create a fake user to initialize the database
var kevin = new User({name: 'Kevin', password: 'Kevin'});
kevin.save(function(err) {
  if (err) {
    console.log(err);
  }
});

module.exports = User;
