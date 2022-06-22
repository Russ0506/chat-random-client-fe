import React from "react";
import styles from "../../../styles/Welcome/styles.css";
import image from "../../../assets/img/welcome_img.svg";

export default function Welcome() {
  return (
    <>
      {/* <!-- Navbar Section --> */}
      <nav className="navbar">
        <a href="/" className="navbar__logo">
          Cherish by chating
        </a>
        <div className="navbar__bars">
          <i className="fas fa-bars"></i>
        </div>
        <div className="navbar__menu">
          <a href="/" className="navbar__menu--links">
            Home
          </a>
          <a href="/" className="navbar__menu--links">
            Products
          </a>
          <a href="/" className="navbar__menu--links">
            Services
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
            <h1>Start a new friend</h1>
            <h2>With Cherish</h2>
            <p>Sign up now to chat.</p>
            <button className="hero__container--btn">
              <a href="/register">Sign Up</a>
            </button>
          </div>
          <div className="hero__container--right">
            <input type="image" src={image} alt="image" className="hero__container--img" />
          </div>
        </div>
      </div>
    </>
  );
}
