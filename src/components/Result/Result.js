import React from 'react';

const Result = props => (
  <div className='result'>
    <p className='success'>
      {props.success ? '🎉 You Rock ! 🤘' : 'You Passed Away... 🧟‍♂️'}
    </p>
    <button onClick={() => props.clicked()}>Play</button>
    <p className='playInfo'>Press [Enter] or [Spacebar]</p>
  </div>
);

export default Result;
