import React from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/store";
import "./index.scss";
import { createRoot } from "react-dom/client";
import { icons } from "./assets/icons";
import { Provider } from "react-redux";
import { setupAxios } from "./setup/axiosClient";
import { ConfigProvider } from "./contexts/ConfigContext";
// import { BrowserRouter } from "react-router-dom";
// import rootReducer from "./reducers";

React.icons = icons;

// const store = createStore(rootReducer, composeWithDevTools());
const root = createRoot(document.getElementById("root"));
setupAxios(store);

root.render(
  <Provider store={store}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </Provider>
);
