import React from 'react';
import Info from './info.js';
import Translator from './translator.js'

var Pin = (props) => {
  let foundText = '';

  function setCurrentText(e) {
    var inner = foundText.innerHTML;
    props.isLoaded();
    console.log(inner);
    if (!props.show) {
      props.setText(foundText.innerHTML);
      props.fetchConcepts(inner, (res) => {
        let firstFound = res[0]
        foundText = `${firstFound[0]} ${firstFound[1]}`;
        props.setTitleForDropDown(firstFound[0]);
        props.showDiv();
        props.modifyDescObj(inner, foundText);
        props.isLoaded();
      });
    } else {
      props.setText('');
      props.modifyDescObj(inner, null);
      props.showDiv();
      props.isLoaded();
    }
  }

  function displayTranslation(e) {
    console.log('hey');
    props.fetchLanguageTranslator(props.pin, 'Arabic');
  }

  return (
    <div className="poppaDiv">
      <div className="listContainer">
        <div className="notesText" ref={(input) => {foundText = input} }>
          {props.pin}
        </div>
        <Translator translated={props.translatedText} />
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
        <button className="lstBtn" type="button" onClick={displayTranslation}>
          <span className="glyphicon glyphicon-resize-horizontal"></span>
        </button>
        <button className="lstBtn" type="button">
          <span className="glyphicon glyphicon-volume-up"></span>
        </button>
      </div>
      <Info
        className="listContainer"
        foundText={foundText}
        currentText={props.currentText}
        pinText={props.pin}
        descObj={props.descObj}
        show={props.show}
        title={props.title}
      />
    </div>
  )
}

export default Pin;
//() => props.fetchLanguageTranslator(props.pin, 'Arabic')