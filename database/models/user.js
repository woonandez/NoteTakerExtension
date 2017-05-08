var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  name: String,
  password: String,
  bookmarks: [{
    url: String,
    notes: [String]
  }]
});

var User = mongoose.model('User', userSchema);

var addUser = function(name, password, uri, notes) {
  console.log(name, password, uri, notes);
  var account = new User({
      name: name,
      password: password,
      bookmarks: [{
        url: uri,
        notes: notes
      }]
    });

  account.save((err, account) => {
    if(err) {
      return console.error(err);
    }
  });
};

// var result = addUser('Kevin', 'Ng', 'www.yahoo.com', "Kevin is awesome");

// You can use this to create a fake user to initialize the database
// var kevin = new User({name: 'Kevin', password: 'Kevin'});
// kevin.save(function(err) {
//   if (err) {
//     console.log(err);
//   }
// });

module.exports = {
  user: User,
  addUser: addUser
};