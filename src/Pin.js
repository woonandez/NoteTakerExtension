import React from 'react';
import Info from './info.js';

var Pin = (props) => {
  let currentText = null;
  let foundText = '';
  let passedDownText = setCurrentText;

  function setCurrentText(e) {
    console.log(e.target);
    var inner = currentText.innerHTML;
    props.fetchConcepts(currentText.innerHTML, (res) => {
      let firstFound = res[0]
      foundText = `${firstFound[0]} ${firstFound[1]}`;
      props.showDiv()
      props.modifyDescObj(inner, foundText);
    });
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
      <Info
        foundText={foundText}
        currentText={props.currentText}
        pinText={props.pin}
        descObj={props.descObj}
        show={props.show}
      />
    </div>
  )
}

export default Pin;
