import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectConversation, selectConversationLatestStatus, updateConversationLatestStatus } from "../../../features/chat/conversationSlice";
import { axiosClient } from "../../../setup/axiosClient";
import PartnerInfo from "./components/PartnerInfo";
import PartnerPoster from "./components/PartnerPoster";
import ReportModal from "./components/ReportModal";
import SecrectPartnerPoster from "./components/SecrectPartnerPoster";
import SharedPartnerInfo from "./components/SharedPartnerInfo";

export default function RightBar() {
  const dispatch = useDispatch();
  const currentConversation = useSelector(selectConversation);
  const conversationLatestStatus = useSelector((state) => {
    return selectConversationLatestStatus(state, currentConversation?.id);
  })
  const [clickedShare, setClickedShare] = useState(false);
  if (!currentConversation) return null

  function shareInformation() {
    if (currentConversation?.current_user_conversation?.status === 'sharing') return;

    let url = `/conversations/${currentConversation.id}/share_profile`
    axiosClient.put(url).then((data) => {
    });

    setClickedShare(true);
    dispatch(updateConversationLatestStatus({conversationId: currentConversation.id, status: 'sharing'}));
  }

  if ((conversationLatestStatus || currentConversation?.status) === "closed") return <></>

  return (conversationLatestStatus || currentConversation?.status) !==
    "sharing" ? (
    <SecrectPartnerPoster
      showInfo={shareInformation}
      accepted={
        clickedShare || (currentConversation?.current_user_conversation?.status === "sharing")
      }
    />
  ) : (
    <SharedPartnerInfo partnerInfor={currentConversation.partner} />
  );
}
