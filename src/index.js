import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { icons } from "./assets/icons";
// import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";

React.icons = icons;

// const store = createStore(rootReducer, composeWithDevTools());
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <UserProvider>
  //   <Provider store={store}>
      <App />
  //   </Provider>
  // </UserProvider>
);
