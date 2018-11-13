import React from 'react';
import propTypes from 'prop-types';
import './styles/appStyle.css';

import GuessCount from './components/GuessCount/GuessCount';
import GuessWord from './components/GuessWord/GuessWord';
import Keyboard from './components/Keyboard/Keyboard';
import Result from './components/Result/Result';

/* Constant */
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class App extends React.Component {
  state = {
    attempt: 0,
    lettersSet: new Set(),
    wordToGuess: ''
  };

  componentDidMount() {
    this.handleNewGame();
    this.handleKeyboard();
  }

  handleNewGame = () => {
    fetch('https://wordsapiv1.p.mashape.com/words/?random=true', {
      headers: {
        'X-Mashape-Key': 'EExNg56Ow4msh39YkNFTAmAOzqbGp1cW7SbjsnjCeve8uSvnCa',
        'X-Mashape-Host': 'wordsapiv1.p.mashape.com'
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          attempt: 7,
          wordToGuess: res.word.toLocaleUpperCase(),
          lettersSet: new Set()
        });
      });
  };

  handleKeyboard() {
    /* If the keyboard key is available, we use it */
    document.addEventListener('keypress', e => {
      const key = ALPHABET.find(letter => letter === e.key.toLocaleUpperCase());
      return key ? this.handleClickLetter(key) : false;
    });
  }

  /* Add Letter in "letterSet" state 
    OR decrement "attempt" state */
  handleClickLetter(letter) {
    let { attempt, lettersSet, wordToGuess } = this.state;
    const endGame = attempt === 0 || this.handleHiddenWord() === wordToGuess;
    const isNotClicked = !lettersSet.has(letter);
    const isNotMatchWord = !wordToGuess.split('').includes(letter);

    if (endGame) return;
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
      <Result clicked={this.handleNewGame} success={attempt !== 0} />
    ) : (
      false
    );
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
