import React from 'react';
import axios from 'axios';


class StatefulComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonText: 'Click me and see what happens'
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
    this.fetch();
  }


  addExclamation () {
    this.setState({
      buttonText: this.state.buttonText + '!'
    });
  }

  render() {
    return (
      <button onClick={()=> {
        this.addExclamation();
      }}>
      {this.state.buttonText}
      </button>
    );
  }
}

export default StatefulComponent;