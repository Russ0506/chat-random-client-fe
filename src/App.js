import React, { Component } from "react";
function App() {
  return (
    <div>
      <Home />
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
