import React from 'react';

var Pin = (props) =>
  <div className="poppaDiv">
    <div className="listContainer">
      <div className="notesText">
        {props.pin}
      </div>
    </div>
    <div className="buttonContainer">
      <button className="lstBtn" onClick={() =>
        props.deleteNote(props.username, props.listname, props.pin)} >
        <span className="glyphicon glyphicon-trash"></span>
      </button>
      <button className="lstBtn" type="button" onClick={() => props.fetchConcepts(props.pin)} onClick={() => props.showDiv()}>
        <span className="glyphicon glyphicon-text-background"></span>
      </button>
      <button className="lstBtn" type="button">
        <span className="glyphicon glyphicon-resize-horizontal"></span>
      </button>
      <button className="lstBtn" type="button">
        <span className="glyphicon glyphicon-volume-up"></span>
      </button>
    </div>
    <div>
      <p>WOO</p>
    </div>
  </div>

export default Pin;
