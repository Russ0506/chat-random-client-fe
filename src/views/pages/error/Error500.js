import { Button } from "@mui/material";
import React, { Component } from "react";
import "../../../styles/Error.css";
import image from "../../../assets/img/illustration_500.svg";
// Phản hồi khó chịu thường xảy ra do sự cố trong code Perl, khi chương trình CGI chạy.

export default class Error500 extends Component {
  render() {
    return (
      <div id="error404">
        <div id="error-text">
          <span>500 Internal Server Error</span>
          <p>There was an error, please try again later.</p>
          <img src={image} alt="image"></img>
          <div id="copyright">
            <br></br>
            <a className="back" title="Igniel" href="/home">
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
