import React from 'react';

var Sources = (props) =>
  <div className="notesText">
    <div className="infoContainer">
      <div className="infoItem">
        <div className="infoTitle">
          {props.title}
        </div>
        {props.sentence}
      </div>
    </div>
  </div>

export default Sources