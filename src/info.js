import React from 'react';

var Info = (props) => {
  // var keys = Object.keys(props.descObj).filter(key => key === props.currentText)
  // console.log(keys, 'woo');
// props.descObj[props.currentText] &&
  if (props.pinText === props.currentText && props.show) {
    return (
      <h2>
        {props.descObj[props.currentText]}
      </h2>
    )
  } else {
    return (
      <h2>{''}</h2>
    )
  }
}


export default Info;