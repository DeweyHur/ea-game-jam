import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import WebFontLoader from "webfontloader";

import "./index.css";

WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"]
  }
});

function reload() {
  const user = window.sessionStorage.getItem("EAGameJamUser");
  const root = _.isEmpty(user) ? (
    <Login reload={reload} />
  ) : (
    <BrowserRouter>
      <Main user={JSON.parse(user)} reload={reload} />
    </BrowserRouter>
  );
  ReactDOM.render(root, document.getElementById("root"));
}

reload();
registerServiceWorker();
