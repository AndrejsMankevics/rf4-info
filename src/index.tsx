import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import appReducer, { initialAppState } from './state/AppReducer';
import { AppStateProvider } from './state/AppStateProvider';
import './styles/colors.css';

ReactDOM.render(
  <AppStateProvider initialState={initialAppState} reducer={appReducer}>
    <App />
  </AppStateProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
