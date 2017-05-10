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




//////////////////////////////////////////////////////////////////////////////////////////


exports.userSignup = (req, res) => {
  User.user.find({name: req.body.name})
    .then(user => {
console.log(user);
      if(user.length !== 0) {
        res.status(200).send('User already exists!');
      } else {
        User.addUser(req.body.name, req.body.password);
        res.status(201).send('Successfully created user!');
      }
    })
    .catch(err => {
      console.log(`Error: ${err}.`);
    });
}





