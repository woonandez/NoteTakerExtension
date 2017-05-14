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
          <div className="pin">
            {this.props.pin}
          </div>
          <button className="btn btn-warning " onClick={() => this.props.deleteNote(this.props.username, this.props.listname, this.props.pin)} >
            <span className="glyphicon glyphicon-trash"></span>
          </button>
        <p className="pin-url"></p>
      </li>
    )
  }
}

export default Pin;

