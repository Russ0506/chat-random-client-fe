import { Button } from '@mui/material'
import React, { Component } from 'react'
import "../../../styles/Error.css"

// lỗi Not Found
// Các file được yêu cầu không có trên máy chủ. 
// Có thể bởi vì những file này đã bị xóa, hoặc chưa từng tồn tại trước đây. 
// Nguyên nhân thường là do lỗi chính tả trong URL.

export default class Error404 extends Component {
  render() {
    return (
        <div id='error404'>
        <div id='error-text'>
          <span>404</span>
          <p>Error Page Not Found</p>
          <div id='copyright'>
          <a class='back' title='Igniel' href="/home">Go home</a>
            </div>
        </div>
      </div>
    )
  }
}
