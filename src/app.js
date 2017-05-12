import React from "react";
import axios from "axios";
import Pin from "./Pin";
import Nav from "./Nav";
import List from "./List";
import AuthService from "./utils/AuthService";

const auth = new AuthService(
  "7ahU6Olf4SuRFf3B3lDGVuY6DGP0hj5T",
  "dhsiao89.auth0.com"
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { urls: [] }

      // fakeData: {
      //   name: "Kevin",
      //   password: "qwerty",
      //   urls: [
      //     {
      //       url: "www.craiglist.com/deal",
      //       notes: ["Great Deal", "Greater Deal"]
      //     },

      //     {
      //       url: "www.craiglist.com/job",
      //       notes: ["Great KEVIN", "Greater Job"]
      //     }
      //   ]
      // }
    };

    this.fetch = this.fetch.bind(this);
  }

  fetch() {
    axios
      .get("/api/users")
      .then(res => {
        this.setState({ data: res.data[0] });

        console.log("DATA: ", this.state.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleClick() {

  }

  deleteNote(name, uri, note) {
    axios({ method: 'delete', url: '/api/users/notes', data: { name: name, uri: uri, note: note } })
      .then(res => {
        this.fetch();
        console.log("NOTE DELETED!");
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteList(name, uri) {
    axios({ method: 'delete', url: '/api/users/urls', data: { name: name, uri: uri } })
      .then(res => {
        this.fetch();
        console.log("LIST DELETED!");
      })
      .catch(error => {
        console.error(error);
      });
  }





  componentDidMount() {
    this.fetch();

  }

  render() {
    console.log("Rendering...................");
    console.log("Name: ", this.state.data.name);

    return (
      <div>
        <Nav auth={auth} />

        <div className="container">

          {this.state.data.urls.map((list, index) => (
            <List name={this.state.data.name} data={list} key={index} deleteList = {this.deleteList.bind(this)} deleteNote = {this.deleteNote.bind(this)}/>
          ))}

        </div>

      </div>
    );
  }
}

export default App;
