import { Button } from '@mui/material'
import React, { Component } from 'react'
import "../../../styles/Error.css"

// Phản hồi khó chịu thường xảy ra do sự cố trong code Perl, khi chương trình CGI chạy.

export default class Error500 extends Component {
  render() {
    return (
        <div id='error404'>
        <div id='error-text'>
          <span>500</span>
          <p>Internal Server Error</p>
          <div id='copyright'>
          <a class='back' title='Igniel' href="/home">Go home</a>
            </div>
        </div>
      </div>
    )
  }
}
