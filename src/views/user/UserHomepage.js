import React from 'react'
import LeftSideBar from '../pages/chat/components/leftBar/LeftSideBar'
import MessageLayout from '../pages/chat/components/message/MessageLayout'
import RightBar from '../pages/chat/components/rightBar/RightBar'
import TopBar from '../pages/chat/components/topBar/TopBar'

export default function UserHomepage() {
  return (
    <>
      <LeftSideBar />
      <RightBar />
      <TopBar />
      <MessageLayout />
    </>
  )
}
