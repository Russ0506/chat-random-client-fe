import React from "react";
import DrawerSideBar from "../../../../common/drawer/DrawerSideBar";
import ChatSideBar from "./chatSideBar/ChatSideBar";
import SearchChatBoxLayer from "./components/SearchChatBoxLayer";
import TopSideBar from "./components/TopSideBar";
import GroupChatSideBar from "./groupSideBar/GroupChatSideBar";

export default function LeftSideBar() {
  return (
    <>
      {/* <TopSideBar/>
      <SearchChatBoxLayer />
      <GroupChatSideBar />
      <ChatSideBar /> */}
      <DrawerSideBar />
    </>
  );
}
