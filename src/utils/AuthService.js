import Auth0Lock from "auth0-lock";
import { browserHistory } from "react-router";
import axios from "axios";

var account = {};

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: "http://localhost:3003/",
        responseType: "token"
      }
    });
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  _doAuthentication(authResult) {
    //var account = {};

    // Saves the user token
    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      //console.log("client info", profile);
      account.name = profile.email;
      account.user_id = profile.user_id;
      console.log("hello account", account);
      this.createNewUser(account);
    });
    this.setToken(authResult.idToken);
    // navigate to the home route
    //browserHistory.replace("/");
  }

  createNewUser(account) {
    axios
      .post("/api/users/", account)
      .then(res => {
        console.log("Auth0 save user success!");
      })
      .catch(error => {
        console.error(error);
      });
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  }

  setToken(idToken) {
    console.log("****");
    console.log(idToken);
    // Saves user token to local storage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem("id_token");
  }
}


window.account = account;