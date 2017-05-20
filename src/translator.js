import React from 'react';

var Translator = (props) =>{
  if (props.active) {
    return (
      <div>
        {props.translated}
      </div>
    )
  } else {
    return (
      <div>{''}</div>
    )
  }
}


export default Translator;

