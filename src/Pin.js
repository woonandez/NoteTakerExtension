import React from 'react';

var Pin = (props) =>
  <li className="list-group-item">
    <div className="pin">
      {props.pin}
    </div>
    <button className="btn btn-warning " onClick={() => props.deleteNote(props.username, props.listname, props.pin)} >
      <span className="glyphicon glyphicon-trash"></span>
    </button>
    <p className="pin-url"></p>
  </li>
export default Pin;

