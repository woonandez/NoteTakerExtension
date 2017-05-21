import React from 'react';
import axios from 'axios';
import Pin from './Pin';
import Nav from './Nav';
import List from './List';
import AuthService from './utils/AuthService';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleAuthenticate = this.handleAuthenticate.bind(this);
    this.fetch = this.fetch.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.fetchConcepts = this.fetchConcepts.bind(this);
    this.fetchLanguageTranslator = this.fetchLanguageTranslator.bind(this);
    this.showDiv = this.showDiv.bind(this);
    this.isLoaded = this.isLoaded.bind(this);
    this.setText = this.setText.bind(this);
    this.modifyDescObj = this.modifyDescObj.bind(this);
    this.setTitleForDropDown = this.setTitleForDropDown.bind(this);

    this.auth = new AuthService(
      'gLvvvwQlgFMIhedyBZDIjsGrb1Oa47oZ',
      'xosk.auth0.com',
      this.handleAuthenticate
    );

    this.state = {
      data: { urls: [] },
      loggedIn: this.auth.loggedIn(),
      show: false,
      loading: false,
      currentText: '',
      translatedText: '',
      activePinIndex: -1,
      activeListIndex: -1,
      showTranslated: false,
      title: '',
      descObj: {},
      audioFile: '',
      language: 'Arabic',
      recentQuery: []

    };
  }

//Check if logged in
  handleAuthenticate() {
    this.setState({
      loggedIn: this.auth.loggedIn()
    });
  }

//Get specific user
  fetch() {
    axios
      .get('/api/users/' + this.auth.getAccount().user_id)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({ data: res.data[0] });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


// fetch concepts for the user
  fetchConcepts(textBlock, callback) {
    axios({
      method: 'GET',
      url: '/api/watson/concepts',
      params: {
        text: textBlock
      }
    })
    .then((res) => {
      this.setState({
        recentQuery: res.data
      });
      callback(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }

// fetch a translation for a user
  fetchTranslation(textBlock) {
    axios({
      method: 'GET',
      url: '/api/watson/translate',
      params: {
        text: textBlock
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err);
    })
  }

// get the language in which the text is to be translated in
  getLanguage(e) {
    console.log("e.target.value", e.target.value);
    var selected = e.target.value;
    this.setState({
      language: selected
    })
  }

// fetch speech dictation
  fetchDictation(textBlock, callback) {
    axios({
      method: 'GET',
      url: '/api/watson/read',
      params: {
        text: textBlock
      }
    })
    .then((res) => {
      console.log(res);
      this.setState({
        audioFile: `/temp/${res.data}.webm`
      }, function() {
        var audio = document.getElementById('audio');
        audio.load();
        audio.play();
      });
    })
    .catch((err) => {
      console.error(err)
    })
  }

// fetch translated text from api
  fetchLanguageTranslator(listIndex, pinIndex, text, translateTo) {
    axios({
      method: 'get',
      url: '/api/watson/translate',
      params: {
        text: text,
        translateTo: translateTo
      }
    })
    .then((res) => {
      console.log('******', res);
      var bool = this.state.showTranslated
      this.setState({
        translatedText: res.data,
        showTranslated: !bool,
        activePinIndex: pinIndex,
        activeListIndex: listIndex
      })
    })
    .catch((err) => {
      console.error('*********', err)
    })
  }


//Remove note from database
  deleteNote(name, uri, note) {
    axios({
        method: 'DELETE',
        url: '/api/users/notes',
        data: { name: name, uri: uri, note: note }
      })
      .then((res) => {
        this.fetch();
      })
      .catch(error => {
        console.error(error);
      });
  }

//Remove entire url from database
  deleteList(name, uri) {
    axios({
        method: 'DELETE',
        url: '/api/users/urls',
        data: { name: name, uri: uri }
      })
      .then((res) => {
        this.fetch();
      })
      .catch((error) => {
        console.error(error);
      });
  }

//Set sign out state
  handleSignout() {
    this.setState({
      loggedIn: false,
      data: { urls: [] }
    });
  }

  showDiv() {
    var bool = this.state.show;
    this.setState({
      show: !bool
    });
  }

  isLoaded() {
    var bool = this.state.loading;
    this.setState({
      loading: !bool
    });
  }

  setText(val) {
    this.setState({
      currentText: val
    });
  }

  setTitleForDropDown(input) {
    this.setState({
      title: input
    });
  }

  modifyDescObj(originalText, foundText) {
    let copyOfState = Object.assign(this.state.descObj);
    copyOfState[originalText] = foundText;
    this.setState({
      descObj: copyOfState
    });
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      this.fetch();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.loggedIn && !this.state.loggedIn) {
      this.fetch();
    }
  }

  render() {
    return (
      <div>
        <Nav auth={this.auth} onSignout={this.handleSignout}/>
        <div className="container">
          {this.state.data.urls.map((list, index) => (
            <List
              name={this.state.data.name}
              data={list}
              key={index}
              listid={index}
              deleteList={this.deleteList.bind(this)}
              deleteNote={this.deleteNote.bind(this)}
              fetchConcepts={this.fetchConcepts.bind(this)}
              fetchLanguageTranslator={this.fetchLanguageTranslator.bind(this)}
              fetchDictation={this.fetchDictation.bind(this)}
              translatedText={this.state.translatedText}
              showTranslated={this.state.showTranslated}
              show={this.state.show}
              loading={this.state.loading}
              title={this.state.title}
              showDiv={this.showDiv.bind(this)}
              currentText={this.state.currentText}
              setText={this.setText.bind(this)}
              descObj={this.state.descObj}
              modifyDescObj={this.modifyDescObj.bind(this)}
              activePinIndex={this.state.activePinIndex}
              activeListIndex={this.state.activeListIndex}
              setTitleForDropDown={this.setTitleForDropDown.bind(this)}
              isLoaded={this.isLoaded.bind(this)}
              audioFile={this.state.audioFile}
              language={this.state.language}
              getLanguage={this.getLanguage.bind(this)}
              recentQuery={this.state.recentQuery}
            />
          ))}
        </div>
        <audio id="audio">
          <source src={this.state.audioFile} type="audio/webm"></source>
        </audio>
      </div>
    );
  }
}

export default App;
