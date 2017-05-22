import React from 'react';

var Translator = (props) =>{
  function translate(e) {
    props.getLanguage(e, props.listid, props.pinid, props.pin, props.language);
  }
  if (props.active) {
    return (
      <div>
      <div>
      <select className='transLanguage' onChange={translate}>
        <option value="Arabic" className="option">Arabic</option>
        <option value="German" className="option">German</option>
        <option value='Japanese' className="option">Japanese</option>
        <option value="Spanish" className="option">Spanish</option>
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

