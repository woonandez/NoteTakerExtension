import React from 'react';

class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('Pin.js props: ', this.props);
    return (



        <li className="list-group-item">

          {this.props.pin}

          <a href="#" className="btn btn-danger pull-right" onClick={() => this.props.deleteNote('Anton', 'google.com', this.props.pin)} ><span className="glyphicon glyphicon-trash"></span></a>




        <p className="pin-url"></p>

      </li>
    )
  }
}

export default Pin;

