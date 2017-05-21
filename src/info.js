import React from 'react';
import Sources from './Sources.js';
import Topics from './Topics.js';

var Info = (props) => {
  var resultsContainer = props.recentQuery;
  console.log(resultsContainer)
  if (props.pinText === props.currentText && props.loading) {
    return (
      <div className="icantwait">
        <h3>Loading...</h3>
      </div>
    )
  }
  if (props.pinText === props.currentText && props.show) {
    return (
      <div className="infoBody">
        <div className="bodyTopicsContainer">
          <Topics />
        </div>
        {
          resultsContainer.map((string, key) => (
            <Sources
              title={string[0]}
              sentence={string[1]}
              key={key}
              link={string[2]}
            />
          ))
        }
      </div>
    )
  } else {
    return (
      <h2>{''}</h2>
    )
  }
}


export default Info;