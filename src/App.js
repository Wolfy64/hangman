import React from 'react';
import propTypes from 'prop-types';
import './styles/appStyle.css';

import GuessCount from './components/GuessCount/GuessCount';
import GuessWord from './components/GuessWord/GuessWord';
import Keyboard from './components/Keyboard/Keyboard';
import Result from './components/Result/Result';

const API_KEY = process.env.REACT_APP_API_KEY;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class App extends React.Component {
  state = {
    attempt: 7,
    lettersSet: new Set(),
    wordToGuess: 'STRING'
  };

  componentDidMount() {
    this.handleNewGame();
    this.handleKeyboard();
  }

  handleNewGame = () => {
    fetch('https://wordsapiv1.p.mashape.com/words/?random=true', {
      headers: {
        'X-Mashape-Key': API_KEY,
        'X-Mashape-Host': 'wordsapiv1.p.mashape.com'
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          attempt: 7,
          wordToGuess: res.word.toUpperCase().replace(/\s/g, '-'),
          lettersSet: new Set()
        });
      });
  };

  handleKeyboard() {
    document.addEventListener('keypress', e => {
      /* Start a new game only if the game is over */
      if (this.gameIsOver()) {
        if (e.code === 'Enter' || e.code === 'Space') this.handleNewGame();
      }
      /* If the keyboard key is available, we use it */
      const key = ALPHABET.find(letter => letter === e.code.slice(3));
      return key ? this.handleClickLetter(key) : false;
    });
  }

  /* Add Letter in "letterSet" state 
    OR decrement "attempt" state */
  handleClickLetter(letter) {
    if (this.gameIsOver()) return;

    let { attempt, lettersSet, wordToGuess } = this.state;
    const isNotClicked = !lettersSet.has(letter);
    const isNotMatchWord = !wordToGuess.split('').includes(letter);

    if (isNotMatchWord && isNotClicked) attempt--;

    this.setState({
      lettersSet: lettersSet.add(letter),
      attempt
    });
  }

  handleHiddenWord() {
    const { attempt, lettersSet, wordToGuess } = this.state;

    /* Show the wordToGuess if player has lost */
    if (attempt === 0) return wordToGuess;

    /* Replace word's letter by space 
    if not match the lettersSet state. */
    return wordToGuess.replace(/\w/g, letter =>
      lettersSet.has(letter) ? letter : ' '
    );
  }

  gameIsOver() {
    const { attempt, wordToGuess } = this.state;
    /* Return True if the game is over */
    return attempt === 0 || this.handleHiddenWord() === wordToGuess;
  }

  render() {
    const { attempt, lettersSet } = this.state;
    const result = this.gameIsOver() && (
      <Result clicked={this.handleNewGame} success={attempt !== 0} />
    );

    const keyboard = (
      <Keyboard
        letters={ALPHABET}
        cover={letter => lettersSet.has(letter)}
        clicked={letter => this.handleClickLetter(letter)}
      />
    );

    return (
      <div className='hangman'>
        <h1> Welcome to the Hangman Game </h1>
        <GuessCount guesses={attempt} />
        <GuessWord hiddenWord={this.handleHiddenWord()} />
        {result || keyboard}
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
