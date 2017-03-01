import React, { Component, PropTypes } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore, applyMiddleware } from 'redux'


const reducer = (state = 0, action) => {
  console.log("state: ", state, "action: ", action);
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;

    default:
      return state;
  }
}

/*
const logger = store => next => action {
    console.log('logger: dispatching:', action);
    var result = next(action);
    console.log('logger: get state:', store.getState());
    return result;
};
*/

const logger = store => next => action => {
    let result = next(action); // 返回的也是同样的action值
    console.log('dispatch', action);
    console.log('nextState', store.getState());
    return result;
};


const store = applyMiddleware(logger)(createStore)(reducer);
//another way to apply middelware
//const store = createStore(reducer, applyMiddleware(logger));

class Counter extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onIncrease}>+</button>
        <button onClick={this.props.onDecrease}>-</button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{store.getState()}</p>
        <Counter
          onIncrease={() => store.dispatch({type: 'add'})}
          onDecrease={() => store.dispatch({type: 'minus'})}
        />
      </div>
    );
  }
}


export {App, store};
