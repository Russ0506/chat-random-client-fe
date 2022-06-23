import React from "react";
import styles from "../../../styles/Welcome/styles.css";
import image from "../../../assets/img/welcome_img.svg";

export default function Welcome() {
  return (
    <body>
      {/* <!-- Navbar Section --> */}
      <nav class="navbar">
        <a href="/" class="navbar__logo">
          Cherish by chating
        </a>
        <div class="navbar__bars">
          <i class="fas fa-bars"></i>
        </div>
        <div class="navbar__menu">
          <a href="/" class="navbar__menu--links">
            Home
          </a>
          <a href="/" class="navbar__menu--links">
            Products
          </a>
          <a href="/" class="navbar__menu--links">
            Services
          </a>
          <a href="/users/login" class="navbar__menu--links" id="button">
            Sign In
          </a>
        </div>
      </nav>

      {/* <!-- Hero Section --> */}
      <div class="hero">
        <div class="hero__container">
          <div class="hero__container--left">
            <h1>Start a new friend</h1>
            <h2>With Cherish</h2>
            <p>Sign up now to chat.</p>
            <button class="hero__container--btn">
              <a href="/register">Sign Up</a>
            </button>
          </div>
          <div class="hero__container--right">
            <img src={image} alt="image" class="hero__container--img" />
          </div>
        </div>
      </div>
    </body>
  );
}
