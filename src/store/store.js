import { createStore } from "redux";

const initialState = {
  sidebarShow: "responsive",
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = createStore(
  changeState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
