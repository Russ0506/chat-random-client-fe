import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeConversation, selectConversation, selectConversationLatestStatus } from "../../../features/chat/conversationSlice";
import { axiosClient } from "../../../setup/axiosClient";
import PartnerInfo from "./components/PartnerInfo";
import PartnerPoster from "./components/PartnerPoster";
import ReportModal from "./components/ReportModal";
import SecrectPartnerPoster from "./components/SecrectPartnerPoster";

export default function RightBar() {

  const [reportModal, setReportModal] = React.useState(false)

  const dispatch = useDispatch();
  const currentConversation = useSelector(selectConversation);
  const conversationLatestStatus = useSelector((state) => {
    return selectConversationLatestStatus(state, currentConversation?.id);
  })
  if (!currentConversation) return null

  function shareInformation() {
    if (currentConversation?.current_user_conversation?.status === 'sharing') return;

    let url = `/conversations/${currentConversation.id}/share_profile`
    axiosClient.put(url).then((data) => {
    });

    let changedCurrentConversation = { ...currentConversation };
    let temp = { ...changedCurrentConversation.current_user_conversation };
    temp.status = 'sharing';
    changedCurrentConversation.current_user_conversation = temp;
    dispatch(changeConversation(changedCurrentConversation));
  }

  function reportUser() {
    setReportModal(true);
  }

  return (conversationLatestStatus || currentConversation?.status) !== 'sharing' ? (
    <>
      <ReportModal
        onClose={() => setReportModal(false)}
        open={reportModal}
        data = {currentConversation.partner}
        ></ReportModal>
      <SecrectPartnerPoster showInfo={shareInformation}
        reportUser={reportUser}
        accepted={currentConversation?.current_user_conversation?.status === 'sharing'} />
    </>

  ) : (
    <>
      <Stack
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "30%", minHeight: "320px" }}
      >
        <PartnerInfo />
      </Stack>
      <Box sx={{ height: "40%" }}>
        <PartnerPoster />
      </Box>
    </>
  );
}
