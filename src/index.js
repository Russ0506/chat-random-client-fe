import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/store"

import {createRoot} from 'react-dom/client';
import { icons } from "./assets/icons";
import { Provider } from "react-redux";
import { setupAxios } from './setup/axiosClient'
// import rootReducer from "./reducers";

React.icons = icons;

// const store = createStore(rootReducer, composeWithDevTools());
const root = createRoot(document.getElementById("root"));
setupAxios(store)

root.render(
  // <UserProvider>
    <Provider store={store}>
      <App />
     </Provider>
  // </UserProvider>
);
