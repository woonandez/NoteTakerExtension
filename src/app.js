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
      showTranslated: false,
      title: '',
      descObj: {}
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

// fetch speech dictation
  fetchDictation(textBlock) {
    axios({
      method: 'GET',
      url: '/api/watson/read',
      params: {
        text: textBlock
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err)
    })
  }

//added fetchLanguageTranslator to fetch data from api
  fetchLanguageTranslator(text, translateTo) {
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

      this.setState({
        translatedText: res.data,
        showTranslated: !this.showTranslated

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
              deleteList={this.deleteList.bind(this)}
              deleteNote={this.deleteNote.bind(this)}
              fetchConcepts={this.fetchConcepts.bind(this)}
              fetchLanguageTranslator={this.fetchLanguageTranslator.bind(this)}
              translatedText={this.state.translatedText}
              show={this.state.show}
              loading={this.state.loading}
              title={this.state.title}
              showDiv={this.showDiv.bind(this)}
              currentText={this.state.currentText}
              setText={this.setText.bind(this)}
              descObj={this.state.descObj}
              modifyDescObj={this.modifyDescObj.bind(this)}
              setTitleForDropDown={this.setTitleForDropDown.bind(this)}
              isLoaded={this.isLoaded.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
