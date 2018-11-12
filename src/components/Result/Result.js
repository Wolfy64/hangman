import React from 'react';

const Result = props => (
  <div>
    <div className='result'>
      {props.success ? '🥳 You Rock ! 🤘' : 'You Passed Away... 🧟‍♂️'}
    </div>
    <button onClick={() => props.clicked()}>Start</button>
  </div>
);

export default Result;
