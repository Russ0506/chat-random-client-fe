import React from 'react'
import ChatInfoLayer from '../components/ChatInfoLayer'
import FilterChatBoxLayer from '../components/FilterChatBoxLayer'
import TopSideBar from '../components/TopSideBar'

export default function ChatSideBar() {
  return (
    <>
      <h1>group chat layer</h1>
      <ChatInfoLayer />
      <FilterChatBoxLayer />
    </>
  )
}
