// import "react-app-polyfill/ie11"; // For IE 11 support
// import "react-app-polyfill/stable";
// import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "./context/UserContext";

import { icons } from "./assets/icons";

import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";

React.icons = icons;

const store = createStore(rootReducer, composeWithDevTools());
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </UserProvider>
);
