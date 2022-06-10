import { Button } from "@mui/material";
import React, { Component } from "react";
import "../../../styles/Error.css";
import image from "../../../assets/img/illustration_404.svg";

// lỗi Not Found
// Các file được yêu cầu không có trên máy chủ.
// Có thể bởi vì những file này đã bị xóa, hoặc chưa từng tồn tại trước đây.
// Nguyên nhân thường là do lỗi chính tả trong URL.

export default class Error404 extends Component {
  render() {
    return (
      <div id="error404">
        <div id="error-text">
          <span>Sorry, page not found!</span>
          <p>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </p>
          <img src={image} alt="image"></img>
          <div id="copyright">
            <br></br>
            <a class="back" title="Igniel" href="/home">
              Go home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
