import React from 'react';

const Result = props => (
  <div>
    <h2>{props.success ? '🎉🎉 Victoire ! 🎉🎉' : '☠️☠️ Perdu ! ☠️ ☠️'}</h2>
    <button onClick={() => props.clicked()}>Rejouer</button>
  </div>
);

export default Result;
