import React from 'react';

const Result = props => (
  <div className='result'>
    <p>{props.success ? '🥳 You Rock ! 🤘' : 'You Passed Away... 🧟‍♂️'}</p>
    <button onClick={() => props.clicked()}>Play</button>
  </div>
);

export default Result;
