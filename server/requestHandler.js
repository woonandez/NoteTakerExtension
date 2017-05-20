var User = require('../database/models/user.js');
var naturalLangLib = require('watson-developer-cloud/natural-language-understanding/v1.js');
var textToSpeechLib = require('watson-developer-cloud/text-to-speech/v1');
var languageTranslatorLib = require('watson-developer-cloud/language-translator/v2');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
require('../auth.js');



//WEB APP ENDPOINTS//
//Handle User Get Request
exports.usersGet = (req, res) => {
  //send user_id in body
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
  //send name/user_id in body
  User.find({user_id: req.body.user_id}, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      if (user.length === 0) {
        var account = new User({
          name: req.body.name,
          user_id: req.body.user_id
        });

        account.save((err, account) => {
          if(err) {
            console.log(err);
            res.status(404).send("Could not create user.");
          } else {
            res.status(201).send("New User Created.");
          }
        });
      } else {
        res.status(201).send('User Already Exists.');
      }
    }
  })
};

//Handle Remove Url
exports.urlRemove = (req, res) => {
  //send name/uri/note in body
  User.findOne({name: req.body.name}, (err, user) => {
    if(err) {
      console.log(err);
      res.status(404).send("Did not find User.");
    }
    var pages = user.urls.map((site) => site.name);
    var index = pages.indexOf(req.body.uri);

    if(index !== -1) {
     user.urls.splice(index, 1);
    }
    user.markModified('urls');
    user.save();
    res.status(201).send('Url Removed');
  });
};

//Handle Remove Note
exports.noteRemove = (req, res) => {
  //send name/url/note in body
  User.findOne({name: req.body.name}, (err, user) => {
    if(err) {
      console.log(err);
      res.status(404).send('Coud not remove note.');
    } else {
      var pages = user.urls.map((site) => site.name);
      var index = pages.indexOf(req.body.uri);

      if(index !== -1) {
        var noteIndex = user.urls[index].pins.indexOf(req.body.note);
        if(noteIndex !== -1) {
          user.urls[index].pins.splice(noteIndex, 1);
        }
      }
      user.markModified('urls');
      user.save();
      res.status(201).send('Note Removed.');
    }
  });
};

//CHROME EXTENSION ENDPOINTS//
//Handle Add note to database for existing Users
exports.userAddNotes = (req, res) => {
  //send name/uri/note in body
  if(req.body.note === null || req.body.note === "") {
    res.status(404).send('Please hightlight something.');
  } else {
    User.findOne({name: req.body.name}, (err, user) => {
      if(err) {
        res.status(404).send('Could not find user.');
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



// IBM Watson endpoints -------------------------------------------------------


var textToSpeech = new textToSpeechLib({
  username: process.env.TEXT_TO_SPEECH_USERNAME,
  password: process.env.TEXT_TO_SPEECH_PASSWORD
});

var naturalLang = new naturalLangLib({
  username: process.env.NATURAL_LANG_USERNAME,
  password: process.env.NATURAL_LANG_PASSWORD,
  version_date: naturalLangLib.VERSION_DATE_2017_02_27
});

var languageTranslator = new languageTranslatorLib({
  username: process.env.TRANSLATOR_USERNAME,
  password: process.env.TRANSLATOR_PASSWORD,
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});



// helper function for requests
var requestCallbacks = function(urls, res, i = 0, paragraphs = []) {
  if (i === urls.length) {
    res.end( JSON.stringify(paragraphs) );
  } else {
    request(urls[i].dbpedia_resource, function (error, response, body) {
      var $ = cheerio.load(body);
      paragraphs.push( [urls[i].text, $('.lead').text()] );
      requestCallbacks(urls, res, i+1, paragraphs);
    });
  }
};

var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function uniqueId(length) {
  var text = '';
  for (var i = 0; i < length; i++) {
    text += possible.charAt( Math.floor(Math.random() * possible.length) );
  }
  return text;
};
// -----------------------------



exports.watsonConcepts = (req, res) => {
  // query = {
  //   text: 'In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.'
  // }
  naturalLang.analyze({
    html: req.query.text,
    features: {
      concepts: {}
    }
  }, function(err, response) {
    if (err) {
      console.log('error:', err);
      res.end('ERROR');
    } else {
      console.log(response.concepts);
      requestCallbacks(response.concepts, res);
    }
  });
};


exports.watsonTextToSpeech = (req, res) => {
  // query = {
  //   text: 'Hello World'
  // }
  var id = uniqueId(30);
  textToSpeech.synthesize({
    text: req.query.text,
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav'
  }).pipe(fs.createWriteStream(`public/temp/${id}.wav`));
  setTimeout(fs.unlink, 120000, `public/temp/${id}.wav`);
  res.end(id);
};


exports.watsonTranslate = (req, res) => {
  // query = {
  //   text: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
  //   translateTo: 'es'
  // }
  console.log('request received')
  languageTranslator.translate({
    text: req.query.text,
    source: 'en',
    target: req.query.translateTo
  }, function (err, results) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log( JSON.stringify(results.translations) );
      res.end( JSON.stringify(results.translations[0].translation) );
    }
  });
};


