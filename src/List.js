import React from 'react';
import Pin from './Pin.js';

var List = (props) =>
  <div className="panel panel-primary">
    <div className="panel-heading">
      <a
        href={props.data.name}
        target="_blank"
        className="panel-title"
      >
        {props.data.name}
      </a>
      <div className="action-buttons">
        <div className="btn-group">
          <button
            className="btn btn-danger"
            onClick={() =>
              props.deleteList(props.name, props.data.name)}
          >
            <span className="glyphicon glyphicon-trash" />
          </button>
        </div>
      </div>
    </div>
    <div className="panel-body">
      <ul className="list-group">
        {props.data.pins.map((pin, index) => (
          <Pin
            pin={pin}
            key={index}
            username={props.name}
            listname={props.data.name}
            deleteNote={props.deleteNote}
            fetchConcepts={props.fetchConcepts}
          />
        ))}
      </ul>
    </div>
  </div>

export default List;
