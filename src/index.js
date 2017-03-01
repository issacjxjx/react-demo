import React from 'react';
import ReactDOM from 'react-dom';
import {App, store} from './App';
import './index.css';

const render = ()=> {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();
