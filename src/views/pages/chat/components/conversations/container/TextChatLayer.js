import React from 'react'

export default function TextChatLayer() {

  const [text, setText] = React.useState("")

  return (
    <div>
      <h2>TextChatLayer</h2>
      <ul>
        <li>left: choose emoji icon</li>
        <li>center: message chat text inputd</li>
        <li>
          <ol>right:
            <li>choose file upload icon</li>
            <li>choose image upload icon</li>
            <li>send text voice record icon</li>
            <li>send message icon</li>
          </ol>
        </li>
      </ul>
    </div>
  );
}
