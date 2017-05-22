import React from 'react';

var Sources = (props) =>
  <div className="notesText">
    <div className="infoContainer">
      <div className="infoItem">
        <div className="infoTitle">
          <a className="uniqueLink" href={props.link} target="_blank">{props.title}</a>
        </div>
        {props.sentence}
      </div>
    </div>
  </div>

export default Sources

