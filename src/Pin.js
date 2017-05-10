import React from 'react';

class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="pin">

        <div className="note-container">
          <span>PIN: {this.props.pin}</span>

        </div>

        <p className="pin-url"></p>

      </div>

    )
  }
}

export default Pin;

