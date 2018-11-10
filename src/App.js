import React from 'react';
import propTypes from 'prop-types';
import shuffle from 'lodash.shuffle';
import './styles/appStyle.css';

import GuessCount from './components/GuessCount/GuessCount';
import GuessWord from './components/GuessWord/GuessWord';
import Letter from './components/Letter/Letter';
import Keyboard from './components/Keyboard/Keyboard';
import Result from './components/Result/Result';

// Constant
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const WORD_LIST = [
  'BONJOUR',
  'SOLEIL',
  'BONHEUR',
  'SATURNE',
  'TABLE',
  'SUPER',
  'OCEAN'
];

class App extends React.Component {
  state = {
    attempt: 0,
    lettersSet: new Set(),
    wordToGuess: ''
  };

  componentDidMount() {
    this.newGame();
  }

  newGame = () => {
    this.setState({
      attempt: 7,
      wordToGuess: this.randomWord(),
      lettersSet: new Set()
    });
  };

  randomWord() {
    return shuffle(WORD_LIST)
      .pop()
      .toUpperCase();
  }

  handleLetter(letter) {
    let { attempt, lettersSet, wordToGuess } = this.state;
    const isNotClicked = !lettersSet.has(letter);
    const isNotMatchWord = !wordToGuess.split('').includes(letter);

    if (isNotMatchWord && isNotClicked) attempt--;

    this.setState({
      lettersSet: lettersSet.add(letter),
      attempt
    });
  }

  handleResult() {
    const { attempt, wordToGuess } = this.state;
    if (attempt === 0) return <Result clicked={this.newGame} />;
    if (this.handleHiddenWord() === wordToGuess)
      return <Result success clicked={this.newGame} />;
  }

  handleHiddenWord() {
    const { lettersSet, wordToGuess } = this.state;
    return wordToGuess.replace(/\w/g, letter =>
      lettersSet.has(letter) ? letter : ' '
    );
  }

  render() {
    const { attempt, lettersSet } = this.state;
    const letters = ALPHABET.map((letter, index) => (
      <Letter
        key={index}
        letter={letter}
        cover={lettersSet.has(letter)}
        clicked={() => this.handleLetter(letter)}
      />
    ));

    return (
      <div className="hangman">
        <h1> Welcome to the Hangman Game </h1>
        <GuessCount guesses={attempt} />
        <GuessWord hiddenWord={this.handleHiddenWord()} />
        {this.handleResult() || <Keyboard letters={letters} />}
      </div>
    );
  }
}

export default App;

// PropTypes
GuessCount.propTypes = {
  guesses: propTypes.number.isRequired
};

GuessWord.propTypes = {
  hiddenWord: propTypes.string.isRequired
};

Letter.propTypes = {
  cover: propTypes.bool.isRequired
};

Keyboard.propTypes = {
  letters: propTypes.array.isRequired
};
