import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Channels from './components/Channels'
import MessagesContainer from './components/MessagesContainer'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Channels />
        <MessagesContainer />
      </div>
    );
  }
}

export default App;
