import React from 'react';

var Info = (props) => {
  if (props.descObj[props.pinText] && props.show) {
    return (
      <div className="notesText">
        {props.descObj[props.currentText]}
      </div>
    )
  } else {
    return (
      <h2>{''}</h2>
    )
  }
}


export default Info;