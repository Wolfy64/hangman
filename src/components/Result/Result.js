import React from 'react';

const Result = props => (
  <div>
    <h2>{props.success ? '🎉🎉 Victoire ! 🎉🎉' : '☠️☠️ Perdu ! ☠️ ☠️'}</h2>
    <button onClick={() => props.clicked()}>Start</button>
  </div>
);

export default Result;
