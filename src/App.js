import React, { Component } from "react";
import "./App.css";
import propTypes from "prop-types";
import shuffle from "lodash.shuffle";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PHRASE = [
  "BONJOUR",
  "SOLEIL",
  "BONHEUR",
  "SATURNE",
  "TABLE",
  "SUPER",
  "OCEAN",
  "Si debugger, c’est supprimer des bugs, alors programmer ne peut être que les ajouter "
];

const GuessCount = ({ guesses }) => <div className="guesses">{guesses}</div>;
const GuessPhrase = ({ phrase }) => (
  <div className="guessphrase">
    <span className="phrase">
      {phrase}
    </span>
  </div>
);
const Keyboard = ({ letter, onClick }) => (
  <div className="letter" letter={letter} onClick={() => onClick(letter)}>
    {letter}
  </div>
);
const won = true;
const usedLetters = new Set([]);

// ### propTypes ###

GuessCount.propTypes = {
  guesses: propTypes.number.isRequired
};

GuessPhrase.propTypes = {
  phrase: propTypes.string.isRequired,
}

Keyboard.propTypes = {
  letter: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired
};

class App extends Component {
  state = {
    keyboard: ALPHABET.split(""),
    phrase: shuffle(PHRASE).pop().toUpperCase(),
  };

  handleLetterClick(letter) {
    usedLetters.add(letter)
    console.log(usedLetters);    
  }

  // Raffraichir le masque pour afficher les lettres trouvé !!
  computeDisplay(phrase, letter) {
    console.log(phrase);
    return phrase.replace(/\w/g,
      (letter) => (usedLetters.has(letter) ? letter : '_')
    )
  }

  render() {
    const { keyboard, phrase } = this.state;
    return (
      <div className="hangman">
        <GuessCount guesses={0} />

        <div className="guessphrase">
          <GuessPhrase
            phrase={this.computeDisplay(phrase, usedLetters)}
          />
        </div>

        <div className="keyboard">
          {keyboard.map((letter, index) => (
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
