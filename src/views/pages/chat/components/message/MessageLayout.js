import React from 'react'
import AdminMsg from '../conversations/AdminMsg';
import TextChatLayer from '../conversations/container/TextChatLayer';
import MyMsg from '../conversations/MyMsg';
import PairingPersonMsg from '../conversations/PairingPersonMsg';

export default function MessageLayout() {
  return (
    <>
      <div>this is place where all the chat component is rendered! ==))</div>
      <div>include</div>
      <ol>
        type of chat balloon:
        <li>
          <AdminMsg />
        </li>
        <li>
          <PairingPersonMsg />
        </li>
        <li>
          <MyMsg />
        </li>
      </ol>
      <ol> Layout box chat
        <TextChatLayer />
      </ol>
    </>
  );
}
