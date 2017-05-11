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
      data: { urls: [] },

      fakeData: {
        name: "Kevin",
        password: "qwerty",
        urls: [
          {
            url: "www.craiglist.com/deal",
            notes: ["Great Deal", "Greater Deal"]
          },

          {
            url: "www.craiglist.com/job",
            notes: ["Great KEVIN", "Greater Job"]
          }
        ]
      }
    };

    this.getData = this.getData.bind(this);
  }

  fetch() {
    axios
      .get("/users")
      .then(res => {
        this.setState({ data: res.data[0] });

        console.log("DATA: ", this.state.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    // getPins(query) {
    // }
    // onPinClick(pin) {
  }

  render() {
    console.log("Rendering...................");

    return (
      <div>
        <Nav auth={auth} />

        <div className="container">

          {this.state.data.urls.map((list, index) => (
            <List data={list} key={index} />
          ))}

        </div>

      </div>
    );
  }
}

export default App;
