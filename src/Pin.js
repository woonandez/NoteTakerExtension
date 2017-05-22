import React from 'react';
import Info from './info.js';
import Translator from './translator.js'

var Pin = (props) => {
  let foundText = '';

  function setCurrentText(e) {
    var inner = foundText.innerHTML;
    console.log(inner);
    if (!props.show) {
      props.setText(foundText.innerHTML);
      props.isLoaded();
      props.fetchConcepts(inner, (res) => {
        props.isLoaded();
        let firstFound = res[0]
        foundText = `${firstFound[0]} ${firstFound[1]}`;
        props.setTitleForDropDown(firstFound[0]);
        props.showDiv();
        props.modifyDescObj(inner, foundText);
      });
    } else {
      props.setText('');
      props.modifyDescObj(inner, null);
      props.showDiv();
    }
  }

  //Displays translated text
  function displayTranslation(event) {
    console.log('event.target', event.target.value)
    props.hideTranslated();
    props.fetchLanguageTranslator(props.listid, props.pinid, props.pin, props.language);
  }

  return (
    <div className="poppaDiv">
      <div className="listContainer">
        <div className="notesText" ref={(input) => {foundText = input} }>
          {props.pin}
        </div>
        <Translator id={props.id} active={props.pinid===props.activePinIndex && props.listid===props.activeListIndex && props.showTranslated === true} translated={props.translatedText} getLanguage={props.getLanguage} language={props.language} pinid={props.pinid} listid={props.listid} pin={props.pin} fetchLanguageTranslator={props.fetchLanguageTranslator} />
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
        recentQuery={props.recentQuery}
        loading={props.loading}
      />
    </div>
  )
}

export default Pin;
//() => props.fetchLanguageTranslator(props.pin, 'Arabic')