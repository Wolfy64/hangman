import React from 'react';
import propTypes from 'prop-types';
import Letter from '../Letter/Letter';

const Keyboard = props => (
  <div className='keyboard'>
    {props.letters.map((letter, index) => (
      <Letter
        key={index}
        letter={letter}
        cover={props.cover(letter)}
        clicked={() => props.clicked(letter)}
      />
    ))}
  </div>
);

export default Keyboard;

Letter.propTypes = {
  letter: propTypes.string.isRequired,
  cover: propTypes.bool.isRequired,
  clicked: propTypes.func.isRequired
};
