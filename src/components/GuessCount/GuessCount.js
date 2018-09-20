import React from 'react';

const GuessCount = props => (
  <div className="guesses">Nombre de tentative restant: {props.guesses}</div>
);

export default GuessCount;
