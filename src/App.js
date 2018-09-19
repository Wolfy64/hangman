import React, { Component } from 'react';
import './App.css';
import propTypes from 'prop-types';
import shuffle from 'lodash.shuffle';

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

// Stateless components
const GuessCount = props => (
  <div className="guesses">Nombre de tentative restant: {props.guesses}</div>
);
const GuessWord = props => (
  <div className="guessWord">
    <span className="wordToGuess">{props.hiddenWord}</span>
  </div>
);
const Letter = props => (
  <div
    className={`letter${props.cover ? ' cover' : ''}`}
    feedback={this.getFeedbackForLetter}
    onClick={() => props.clicked()}
  >
    {props.letter}
  </div>
);
const Keyboard = props => <div className="keyboard">{props.letters}</div>;
const Result = props => (
  <div>
    <h2>{props.success ? '🎉🎉 Victoire ! 🎉🎉' : '☠️☠️ Perdu ! ☠️ ☠️'}</h2>
    <button onClick={() => props.clicked()}>Rejouer</button>
  </div>
);

class App extends Component {
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
    return wordToGuess.replace(
      /\w/g,
      letter => (lettersSet.has(letter) ? letter : '_')
    );
  }

  render() {
    const letters = ALPHABET.map((letter, index) => (
      <Letter
        key={index}
        letter={letter}
        cover={this.state.lettersSet.has(letter)}
        clicked={() => this.handleLetter(letter)}
      />
    ));

    return (
      <div className="hangman">
        <GuessCount guesses={this.state.attempt} />
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
