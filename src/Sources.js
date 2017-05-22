import React from 'react';

var Sources = (props) =>
  <div className="notesText">
    <div className="infoContainer">
      <div className="infoItem">
        <div className="infoTitle">
          <a id={props.title} className="uniqueLink" href={props.link} target="_blank">{props.title}</a>
        </div>
        {props.sentence}
      </div>
    </div>
  </div>

export default Sources

// <a href="#name_of_target">Link Text</a>