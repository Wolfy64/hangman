import React from 'react';

const GuessWord = props => (
  <div className="guessWord">
    <span className="wordToGuess">{props.hiddenWord}</span>
  </div>
);

export default GuessWord;
