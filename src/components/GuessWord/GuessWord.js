import React from 'react';

const GuessWord = ({ hiddenWord }) => (
  <div className="wordToGuess">
    {hiddenWord.split('').map((el, index) => (
      <div key={index} className={`hiddenLetter${el !== ' ' ? ' found' : ''}`}>
        {el}
      </div>
    ))}
  </div>
);

export default GuessWord;
