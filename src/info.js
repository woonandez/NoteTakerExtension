import React from 'react';

var Info = (props) => {
  if (props.descObj[props.pinText] && props.show) {
    return (
      <h2>
        {props.descObj[props.pinText]}
      </h2>
    )
  } else {
    return (
      <h2>{''}</h2>
    )
  }
}


export default Info;