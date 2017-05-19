import React from 'react';
import Info from './info.js';

var Pin = (props) => {
  let currentText = null;

  function setCurrentText() {
    console.log('ran', currentText.innerHTML);
//     props.fetchConcepts(props.pin);
// ref={(input) => { textInput = input; }}
  }
  return (
    <div className="poppaDiv">
      <div className="listContainer">
        <div className="notesText" ref={(input) => {currentText = input} }>
          {props.pin}
        </div>
      </div>
      <div className="buttonContainer">
        <button className="lstBtn" onClick={() =>
          props.deleteNote(props.username, props.listname, props.pin)}>
          <span className="glyphicon glyphicon-trash"></span>
        </button>
        <button className="lstBtn" type="button"
          onClick={setCurrentText}>
          <span className="glyphicon glyphicon-text-background"></span>
        </button>
        <button className="lstBtn" type="button">
          <span className="glyphicon glyphicon-resize-horizontal"></span>
        </button>
        <button className="lstBtn" type="button">
          <span className="glyphicon glyphicon-volume-up"></span>
        </button>
      </div>
    </div>
  )
}

export default Pin;
