import React from 'react';
import { WORDS } from '../../data/data';

class Loading extends React.Component {
  state = { index: 0 };

  componentDidMount() {
    this.index = setInterval(() => this.randomIndex(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.index);
  }

  randomIndex() {
    this.setState({
      index: Math.floor(Math.random() * Math.floor(WORDS.length))
    });
  }

  render() {
    return <p className='loading'>{WORDS[this.state.index]}</p>;
  }
}

export default Loading;
