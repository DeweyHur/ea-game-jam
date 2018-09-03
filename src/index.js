import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import WebFontLoader from 'webfontloader';

import './index.css';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const account = window.sessionStorage.getItem("EAGameJamAccount");
const root = account ? (
  <BrowserRouter>
    <Main account={account} />
  </BrowserRouter>
) : (
  <Login />
);

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
