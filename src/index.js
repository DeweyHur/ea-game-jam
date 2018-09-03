import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import Login from './Login';
import registerServiceWorker from './registerServiceWorker';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const account = window.sessionStorage.getItem("EAGameJamAccount");
const root = account ? (
  <Home account={account} />
) : (
  <Login />
);

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
