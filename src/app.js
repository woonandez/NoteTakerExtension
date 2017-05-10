import React from 'react';
import axios from 'axios';
import Pin from './Pin';
import Nav from './Nav';
import List from './List';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeData: {
        name: "Kevin",
        password: "qwerty",
        urls: [
          {
            name: "www.craiglist.com/deal",
            pins: ["Great Deal", "Greater Deal"]
          },

          {
            name: "www.craiglist.com/job",
            pins: ["Great Job", "Greater Job"]
          }
        ]
      }
    };
  }

  fetch() {
    axios.get('/users')
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    //this.fetch();
  }



  // getPins(query) {


  // }



  // onPinClick(pin) {

  // }

  render() {
    return (


      <div className="container">
        <p>Happy Birthday, David!</p>

        <Nav />

        {this.state.fakeData.urls.map((list, index) => (<List data = {list} key={index}/>) )}



      </div>
    );

  }
}

export default App;