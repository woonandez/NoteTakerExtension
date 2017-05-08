var User = require('../database/models/user.js');

exports.userPost = (req, res) => {
  User.addUser(req.body.name, req.body.password, req.body.uri, req.body.notes);
  res.status(201).send('Post Success');
};

exports.usersGet = (req, res) => {
  User.user.find((err, users) => {
    if(err) {
      console.error(err);
    } else {
      res.status(201).send(users);
    }
  })
};

