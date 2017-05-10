var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose
mongoose.Promise = global.Promise;

// GRADY WORK HERE
var userSchema = mongoose.Schema({
  name: String,
  password: String,
  urls: [{
    name: String,
    pins: [String]
  }]
});

var User = mongoose.model('User', userSchema);

//Add User to database GRADY WORK HERE
var addUser = function(name, password) {
  var account = new User({
    name: name,
    password: password
  });

  account.save((err, account) => {
    if(err) {
      return console.error(err);
    }
  });
};

//Add Note to database GRADY WORK HERE
var addNotes =  function(username, uri, note) {
  User.findOne({name: username}, function(err, user){
    console.log(user, uri);
    if(user.url[uri]) {
      user.url[uri].push(note);
    } else {
      //create a new array to store notes
      user.url[uri] = [note];
    }
    user.markModified('url');
    user.save();
  })
};

module.exports = {
  user: User,
  addUser: addUser,
  addNotes: addNotes
};