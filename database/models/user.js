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
var addUser = (name, password) => {
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
var addNotes = (username, uri, note) => {
  User.findOne({name: username}, (err, user) => {
    var pages = user.urls.map(site => site.name);

console.log(pages);
console.log(pages.includes(uri));

    if(pages.includes(uri)) {
      user.urls[pages.indexOf(uri)].pins.push(note);
    } else {
      //create a new array to store notes
      user.urls.push({
        name: uri,
        pins: [note]
      });
    }
    user.markModified('urls');
    user.save();
  })
};

module.exports = {
  user: User,
  addUser: addUser,
  addNotes: addNotes
};