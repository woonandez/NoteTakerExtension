import React from 'react';

var Info = (props) => {
  // var keys = Object.keys(props.descObj).filter(key => key === props.currentText)
  // console.log(keys, 'woo');
// props.descObj[props.currentText] &&
  if (props.pinText === props.currentText && props.show) {
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