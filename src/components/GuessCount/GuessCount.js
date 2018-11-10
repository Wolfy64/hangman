import React from 'react';

const SMILEYS = ['😵', '😱', '😰', '😓', '😦', '🙄', '🤔', '🙂'];

const GuessCount = ({ guesses }) => (
  <div className="guesses">
    {SMILEYS.map((el, index) => (
      <span key={index} className={index === guesses && 'active'}>
        {el}
      </span>
    )).reverse()}
  </div>
);
export default GuessCount;
