import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {CurrentUserProvider} from './components/CurrentUserContext'
import { TweetProvider } from './components/TweetContext';
import {ErrorProvider} from './components/ErrorContext';

ReactDOM.render(
  <ErrorProvider>
    <CurrentUserProvider>
      <TweetProvider>
        <App />
      </TweetProvider>
    </CurrentUserProvider>
  </ErrorProvider>
  ,
  document.getElementById('root')
);
