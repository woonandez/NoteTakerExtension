import React from 'react';
import Pin from './Pin.js';
import Info from './Info.js';

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
            pinid={index}
            listid={props.listid}
            username={props.name}
            listname={props.data.name}
            deleteNote={props.deleteNote}
            fetchConcepts={props.fetchConcepts}
            fetchLanguageTranslator={props.fetchLanguageTranslator}
            fetchDictation={props.fetchDictation.bind(this)}
            translatedText={props.translatedText}
            show={props.show}
            showDiv={props.showDiv}
            setText={props.setText}
            currentText={props.currentText}
            descObj={props.descObj}
            modifyDescObj={props.modifyDescObj}
            activePinIndex={props.activePinIndex}
            activeListIndex={props.activeListIndex}
            setTitleForDropDown={props.setTitleForDropDown}
            isLoaded={props.isLoaded}
            loading={props.loading}
            title={props.title}
            audioFile={props.audioFile}
          />
        ))}
      </ul>
    </div>
  </div>

export default List;
