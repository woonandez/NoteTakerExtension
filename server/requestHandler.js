var User = require('../database/models/user.js');

//WEB APP ENDPOINTS//
//Handle User Get Request
exports.usersGet = (req, res) => {
  console.log(req.params.id);
  User.find({user_id: req.params.id}, (err, user) => {
    if(err) {
      console.error(err);
    } else {
      res.status(201).send(user);
    }
  })
};

//Handle User Post Request
exports.userPost = (req, res) => {
  console.log(req.body.name, req.body.user_id);
  var account = new User({
    name: req.body.name,
    user_id: req.body.user_id
  });

  account.save((err, account) => {
    if(err) {
      console.log(err);
      res.status(404).send("Could not create user");
    } else {
      res.status(201).send("New User Created")
    }
  });
};

//Handle Remove Url
exports.urlRemove = (req, res) => {
  //send username/url in body
  // console.log(req.body.name, req.body.uri);
  User.findOne({name: req.body.name}, (err, user) => {
    if(err) {
      console.log(err);
      res.status(404).send("Did not find User");
    }
    var pages = user.urls.map(site => site.name);
    var index = pages.indexOf(req.body.uri);

    if(index !== -1) {
     user.urls.splice(index, 1);
    }
    user.markModified('urls');
    user.save();
    res.status(201).send('Url Removed');
  });
}

//Handle Remove Note
exports.noteRemove = (req, res) => {
  //send username/url/note in body
  User.findOne({name: req.body.name}, (err, user) => {
    if(err) {
      console.log(err);
      res.status(404).send('Coud not remove note');
    } else {
      var pages = user.urls.map(site => site.name);
      var index = pages.indexOf(req.body.uri);

      if(index !== -1) {
        var noteIndex = user.urls[index].pins.indexOf(req.body.note);
        if(noteIndex !== -1) {
          user.urls[index].pins.splice(noteIndex, 1);
        }
      }
      user.markModified('urls');
      user.save();
      res.status(201).send('Note Removed');
    }
  });
}


//Handle User Login
// exports.userLogin = (req, res) => {
//   User.find({name: req.body.name})
//     .then((user) => {
//       console.log(user);
//       if(user.length !== 0) {
//         if(req.body.password === user[0].password) {
//           res.status(201).send('Login Success');
//         } else {
//           res.status(401).send('Password Incorrect');
//         }
//       } else {
//         res.status(404).send('Username Not Found');
//       }
//   })
//   .catch(err => {
//       console.log(`Error: ${err}.`);
//       res.status(404).send(err);
//   });
// }

//CHROME EXTENSION ENDPOINTS//
//Handle Add note to database for existing Users
exports.userAddNotes = (req, res) => {
  //send username/url/note in body
  if(req.body.note === null || req.body.note === "") {
    res.status(404).send('please hightlight something');
  } else {
    User.findOne({name: req.body.name}, (err, user) => {
      if(err) {
        res.status(404).send('Could not find user');
      }
      var pages = user.urls.map(site => site.name);

      if(pages.includes(req.body.uri)) {
        user.urls[pages.indexOf(req.body.uri)].pins.push(req.body.note);
      } else {
        user.urls.push({
          name: req.body.uri,
          pins: [req.body.note]
        });
      }
      user.markModified('urls');
      user.save();
      res.status(201).send('Post Success');
    });
  }
};

