import React from 'react';

class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="pin">

      <div className="panel panel-default">
        <div className="panel-body">

          {this.props.pin}
          <a href="#" className="btn btn-danger pull-right"><span className="glyphicon glyphicon-trash"></span></a>
        </div>

      </div>

        <p className="pin-url"></p>

      </div>
    )
  }
}

export default Pin;

