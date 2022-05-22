import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/store"

import {createRoot} from 'react-dom/client';
import { icons } from "./assets/icons";
import { Provider } from "react-redux";
// import rootReducer from "./reducers";

React.icons = icons;

// const store = createStore(rootReducer, composeWithDevTools());
const root = createRoot(document.getElementById("root"));

root.render(
  // <UserProvider>
    <Provider store={store}>
      <App />
     </Provider>
  // </UserProvider>
);
