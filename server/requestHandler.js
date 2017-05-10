var User = require('../database/models/user.js');

//Handle User Get Request
exports.usersGet = (req, res) => {
  User.user.find((err, users) => {
    if(err) {
      console.error(err);
    } else {
      res.status(201).send(users);
    }
  })
};

//Handle User Post Request
exports.userPost = (req, res) => {
  User.addUser(req.body.name, req.body.password, req.body.uri, req.body.notes);
  res.status(201).send('Post Success');
};

//Add note to database for existing Users GRADY WORK HERE
exports.userAddNotes = (req, res) => {
  User.addNotes(req.body.name, req.body.uri, req.body.note);
  res.status(201).send('Post Success');
};

//Handle User Signup
exports.userSignup = (req, res) => {
  User.user.find({name: req.body.name})
    .then(user => {
      console.log(user);
      if(user.length !== 0) {
        //redirect to login/auth0 page
        res.status(201).send('User already exists!');
      } else {
        //Adds user to database
        User.addUser(req.body.name, req.body.password);
        res.status(201).send('Successfully created user!');
      }
    })
    .catch(err => {
      console.log(`Error: ${err}.`);
    });
}

//Handle User Login
exports.userLogin = (req, res) => {
  User.user.find({name: req.body.name})
    .then((user) => {
      console.log(user);
      if(user.length !== 0) {
        if(req.body.password === user[0].password) {
          res.status(201).send('Login Success');
        } else {
          res.status(401).send('Password Incorrect');
        }
      } else {
        res.status(404).send('Username Not Found');
      }
  })
  .catch(err => {
      console.log(`Error: ${err}.`);  
      res.status(404).send(err);
  });
}




