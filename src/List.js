import React from 'react';
import Pin from './Pin.js';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('List.js props: ', this.props);
    return (
      <div className="panel panel-primary">

        <div className="panel-heading">
          <a href={'http://www.google.com'} target='_blank' className="panel-title">{this.props.data.name}</a>
          <div className="pull-right action-buttons">
            <div className="btn-group pull-right">
              <a href="#" className="btn btn-warning pull-right" onClick={() => this.props.deleteList(this.props.name, this.props.data.name)} ><span className="glyphicon glyphicon-trash"></span></a>
            </div>
          </div>
        </div>

        <div className="panel-body">
          <ul className="list-group">
            {this.props.data.pins.map((pin, index) => (<Pin pin={pin} key={index} deleteNote = {this.props.deleteNote} />) )}
          </ul>
        </div>
      </div>



      )
    }
}

export default List;

          // <a href="#" className="btn btn-warning pull-right" onClick={() => this.props.deleteList('Anton', this.props.data.name)} ><span className="glyphicon glyphicon-trash"></span></a>