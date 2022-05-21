import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// ✅ now importing from react-dom/client
import {createRoot} from 'react-dom/client';
import { icons } from "./assets/icons";
// import rootReducer from "./reducers";

React.icons = icons;

// const store = createStore(rootReducer, composeWithDevTools());
const root = createRoot(document.getElementById("root"));

root.render(
  // <UserProvider>
  //   <Provider store={store}>
      <App />
  //   </Provider>
  // </UserProvider>
);
