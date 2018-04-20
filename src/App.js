import React, { Component } from "react";
import "./App.css";
import propTypes from "prop-types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const HIDDEN_SYMBOL = "__";

const GuessCount = ({ guesses }) => <div className="guesses">{guesses}</div>;

GuessCount.propTypes = {
  guesses: propTypes.number.isRequired
};

const GuessWord = ({ letter, feedback }) => (
  <div className="guessletter">
    <span className={`letter ${feedback}`}>
      {feedback === "hidden" ? HIDDEN_SYMBOL : letter}
    </span>
  </div>
);

GuessWord.propTypes = {
  letter: propTypes.string.isRequired,
  feedback: propTypes.oneOf([
    'visible',
    'hidden'
  ]).isRequired
};

const Keyboard = ({ letter, onClick }) => (
  <div className="letter" letter={letter} onClick={() => onClick(letter)}>
    {letter}
  </div>
);

Keyboard.propTypes = {
  letter: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
}

const won = true;

class App extends Component {

  keyboard = ALPHABET.split('');

  handleLetterClick(letter) {
    console.log(letter, "clicked");
  }

  render() {
    return (
      <div className="hangman">
        <GuessCount guesses={0} />

        <div className="guessword">
          <GuessWord letter="S" feedback="hidden" />
          <GuessWord letter="O" feedback="visible" />
          <GuessWord letter="L" feedback="hidden" />
          <GuessWord letter="E" feedback="visible" />
          <GuessWord letter="I" feedback="hidden" />
          <GuessWord letter="L" feedback="visible" />
        </div>

        <div className="keyboard">
          {this.keyboard.map((letter, index) => (
            <Keyboard
              letter={letter}
              onClick={this.handleLetterClick}
              key={index}
            />
          ))}
        </div>

        {won && <p>GAGNÉ !</p>}
      </div>
    );
  }
}

export default App;

// const set1 = new Set([1, 2, 3, 4, 5]);

// Produit une représentation textuelle de l’état de la partie,
// chaque lettre non découverte étant représentée par un _underscore_.
// (CSS assurera de l’espacement entre les lettres pour mieux
// visualiser le tout).
// computeDisplay(phrase, usedLetters) {
//   return phrase.replace(/\w/g,
//     (letter) => (usedLetters.has(letter) ? letter : '_')
//   )
// }
