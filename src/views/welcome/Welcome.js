import React from "react";

export default function Welcome() {
  return (
    // <>welcome error, fix later, say more ping more, say less do more</>
    <>
      {/* <!-- Navbar Section --> */}
      <nav className="navbar">
        <a href="/" className="navbar__logo">
          Cherish by chatting
        </a>
        <div className="navbar__bars">
          <i className="fas fa-bars"></i>
        </div>
        <div className="navbar__menu">
          <a href="/" className="navbar__menu--links">
            Home
          </a>
          <a href="/" className="navbar__menu--links">
            Features
          </a>
          <a href="/" className="navbar__menu--links">
            FAQ
          </a>
          <a
            href="/register"
            className="navbar__menu--links"
            id="button_Signup"
            color="#7347c1"
          >
            Sign Up
          </a>
          <a href="/users/login" className="navbar__menu--links" id="button">
            Sign In
          </a>
        </div>
      </nav>

      {/* <!-- Hero Section --> */}
      <div className="hero">
        <div className="hero__container">
          <div className="hero__container--left">
            <h1>Stranger Meetup in</h1>
            <h2>Cherish chatting</h2>
            <p>Meet People Like Never Before</p>
            <button className="hero__container--btn">
              <a href="/register">Get Started</a>
            </button>
          </div>
          <div className="hero__container--right">
            <input
              type="image"
              // src={image}
              alt="image"
              className="hero__container--img"
            />
          </div>
        </div>
      </div>
      <footer>
        <div className="col">
          <small>© 2022 cherishbychatting.com All Rights Reserved</small>
        </div>
      </footer>
    </>
  );
}
