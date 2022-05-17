import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./login";
// import "./scss/style.scss";
// import Interceptors from "./Interceptors";

// context
import { useUserState } from "./context/UserContext";
import Loading from './views/common/Loading'

function App() {
  return (
    <div>
      <Home />
      {/* <Loading /> */}
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>{/* <Link to="/about">About</Link> */}</nav>
    </>
  );
}

export default App;
