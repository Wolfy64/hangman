import React from 'react';

const Letter = props => (
  <div
    className={`letter${props.cover ? ' cover' : ''}`}
    feedback={props.getFeedbackForLetter}
    onClick={() => props.clicked()}>
    {props.letter}
  </div>
);

export default Letter;
