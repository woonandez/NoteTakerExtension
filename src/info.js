import React from 'react';
import Sources from './Sources.js';

var Info = (props) => {
  var resultsContainer = props.recentQuery;
  console.log(resultsContainer, 'HALLO');
  if (props.pinText === props.currentText && props.loading) {
    return (
      <div className="icantwait">
        <h3>Loading...</h3>
      </div>
    )
  }
  if (props.pinText === props.currentText && props.show) {
    return (
      <div className="notesText">
        <div className="infoContainer">
          <div className="infoTitle">
            {props.title}
          </div>
          <div className="infoBody">
            {props.descObj[props.currentText]}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <h2>{''}</h2>
    )
  }
}


export default Info;