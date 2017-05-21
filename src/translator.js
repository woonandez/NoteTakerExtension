import React from 'react';

var Translator = (props) =>{
  if (props.active) {
    return (
      <div>
      <div>
      <select className='transLanguage' onClick={props.getLanguage}>
        <option value="Japanese">Japanese</option>
        <option value="German">German</option>
        <option selected value="props.language">Arabic</option>
        <option value="Spanish">Spanish</option>
      </select>
      </div>
      <div className='trans'>
        <div>
        {props.translated}
        </div>

      </div>
      </div>
    )
  } else {
    return (
      <div>{''}</div>
    )
  }
}


export default Translator;

