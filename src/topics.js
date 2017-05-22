import React from 'react';

var Topics = (props) => {
  var topic = document.getElementById(`${props.topic}`);

  function scrollTo() {
    topic.scrollIntoView({behavior: 'smooth'});
  }
  return (
    <div className="topicItem">
      <div onClick={scrollTo}>{props.topic}</div>
    </div>
  )
}

export default Topics;
