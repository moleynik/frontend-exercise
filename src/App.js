import React, { Component } from 'react';
import './App.css';
import assets$ from './mock';

class App extends Component {
  render() {
    return (
      <div className="app">
        <form className="form">
          <input placeholder="Type asset name or assetId here" type="text" />
          <button>Buy</button>
          <span>Price should be here...</span>
        </form>
        <div className="autosuggestions">
          The list with autosuggestions should be here...
        </div>
      </div>
    );
  }
}

export default App;
