var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

//Add User to database
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

//Add Note to database
var addNotes = (username, uri, note) => {
  User.findOne({name: username}, (err, user) => {
    var pages = user.urls.map(site => site.name);

    if(pages.includes(uri)) {
      user.urls[pages.indexOf(uri)].pins.push(note);
    } else {
      user.urls.push({
        name: uri,
        pins: [note]
      });
    }
    user.markModified('urls');
    user.save();
  });
};

//Remove Sites from database
var removeUrl = (username, uri) => {
  User.findOne({name: username}, (err, user) => {
    var pages = user.urls.map(site => site.name);
    var index = pages.indexOf(uri);

    if(index !== -1) {
     user.urls.splice(index, 1);
    }

    user.markModified('urls');
    user.save();
  });
}

//Remove Notes from database
var removeNote = (username, uri, note) => {
  User.findOne({name: username}, (err, user) => {
    var pages = user.urls.map(site => site.name);
    var index = pages.indexOf(uri);

    if(index !== -1) {
      var noteIndex = user.urls[index].pins.indexOf(note);
      if(noteIndex !== -1) {
        user.urls[index].pins.splice(noteIndex, 1);
      }
    }
    user.markModified('urls');
    user.save();
  });
}


module.exports = {
  user: User,
  addUser: addUser,
  addNotes: addNotes,
  removeUrl: removeUrl,
  removeNote: removeNote
};