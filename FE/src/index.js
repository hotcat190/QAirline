import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './components/GlobalStyles/GlobalStyle';

ReactDOM.render(
  <GlobalStyles>
    <App />
  </GlobalStyles>,
  document.getElementById('root')
);
