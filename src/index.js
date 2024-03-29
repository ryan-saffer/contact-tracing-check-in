import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import Firebase, { FirebaseContext } from './components/Firebase'
import GitHubForkRibbon from 'react-github-fork-ribbon';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
    <GitHubForkRibbon 
      target="_blank"
      position="right"
    >
      Demo App
    </GitHubForkRibbon>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
