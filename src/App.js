import React from 'react';
import propTypes from 'prop-types';
import shuffle from 'lodash.shuffle';
import './styles/appStyle.css';

import GuessCount from './components/GuessCount/GuessCount';
import GuessWord from './components/GuessWord/GuessWord';
import Keyboard from './components/Keyboard/Keyboard';
import Result from './components/Result/Result';

/* Constant */
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

  /* Add Letter in "letterSet" state 
    OR decrement "attempt" state */
  handleClickLetter(letter) {
    let { attempt, lettersSet, wordToGuess } = this.state;
    const isNotClicked = !lettersSet.has(letter);
    const isNotMatchWord = !wordToGuess.split('').includes(letter);

    if (isNotMatchWord && isNotClicked) attempt--;

    this.setState({
      lettersSet: lettersSet.add(letter),
      attempt
    });
  }

  /* If True return <Result> */
  handleResult() {
    const { attempt, wordToGuess } = this.state;
    const endGame = attempt === 0 || this.handleHiddenWord() === wordToGuess;

    return endGame ? (
      <Result clicked={this.newGame} success={attempt !== 0} />
    ) : (
      false
    );
  }

  /* To replace word's letter by space 
    if not match lettersSet state. 
    Return String */
  handleHiddenWord() {
    const { lettersSet, wordToGuess } = this.state;

    return wordToGuess.replace(/\w/g, letter =>
      lettersSet.has(letter) ? letter : ' '
    );
  }

  render() {
    const { attempt, lettersSet } = this.state;

    return (
      <div className='hangman'>
        <h1> Welcome to the Hangman Game </h1>
        <GuessCount guesses={attempt} />
        <GuessWord hiddenWord={this.handleHiddenWord()} />
        {this.handleResult() || (
          <Keyboard
            letters={ALPHABET}
            cover={letter => lettersSet.has(letter)}
            clicked={letter => this.handleClickLetter(letter)}
          />
        )}
      </div>
    );
  }
}

export default App;

/* PropTypes */
GuessCount.propTypes = {
  guesses: propTypes.number.isRequired
};

GuessWord.propTypes = {
  hiddenWord: propTypes.string.isRequired
};

Keyboard.propTypes = {
  letters: propTypes.array.isRequired,
  cover: propTypes.func.isRequired,
  clicked: propTypes.func.isRequired
};
