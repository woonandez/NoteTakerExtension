import React from 'react';

var Sources = (props) =>
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

export default Sources