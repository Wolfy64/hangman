import React from 'react';
import { SMILEYS } from '../../data/data';

const GuessCount = ({ guesses }) => (
  <div className='guesses'>
    {SMILEYS.map((el, index) => (
      <span key={index} className={index === guesses ? 'active' : null}>
        {el}
      </span>
    )).reverse()}
  </div>
);
export default GuessCount;
