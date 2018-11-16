import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import WebFontLoader from "webfontloader";

import "./index.css";
import { getMe } from "./user";

WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"]
  }
});

function reload() {  
  const root = getMe() ? (
    <BrowserRouter>
      <Main reload={reload} />
    </BrowserRouter>
  ) : (
    <Login reload={reload} />
  );
  ReactDOM.render(root, document.getElementById("root"));
}

reload();
registerServiceWorker();
