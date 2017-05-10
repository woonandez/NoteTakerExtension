import React from 'react';
import Pin from './Pin.js';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="list">

        <h2>{this.props.data.name}</h2>

        {this.props.data.pins.map((pin, index) => (<Pin pin={pin} key={index} />) )}

      </div>
      )
    }
}

export default List;

