import React from 'react';
import Translator from './translator.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var Pin = (props) =>
  <div className="poppaDiv">
    <div className="listContainer">
      <div className="notesText">
        {props.pin}
      </div>
      <Translator />
    </div>
    <div className="buttonContainer">
      <button className="lstBtn" onClick={() =>
        props.deleteNote(props.username, props.listname, props.pin)} >
        <span className="glyphicon glyphicon-trash"></span>
      </button>
      <button className="lstBtn" type="button" onClick={() => props.fetchConcepts(props.pin)}>
        <span className="glyphicon glyphicon-text-background"></span>
      </button>
      <button className="lstBtn" type="button" onClick={() => props.fetchLanguageTranslator(props.pin, 'Arabic')}>
        <span className="glyphicon glyphicon-resize-horizontal"></span>
      </button>
      <button className="lstBtn" type="button">
        <span className="glyphicon glyphicon-volume-up"></span>
      </button>
    </div>
  </div>

export default Pin;
//() => props.fetchLanguageTranslator(props.pin, 'Arabic')