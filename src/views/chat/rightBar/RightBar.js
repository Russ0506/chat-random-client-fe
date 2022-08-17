import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeConversation, selectConversation, selectConversationLatestStatus } from "../../../features/chat/conversationSlice";
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



  return (conversationLatestStatus || currentConversation?.status) !==
    "sharing" ? (
    <SecrectPartnerPoster
      showInfo={shareInformation}
      accepted={
        currentConversation?.current_user_conversation?.status === "sharing"
      }
    />
  ) : (
    <>
      <Stack
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "30%", minHeight: "320px" }}
      >
        <PartnerInfo partnerInfor={currentConversation.partner} />
      </Stack>
      <Box sx={{ height: "40%" }}>
        <PartnerPoster partnerInfor={currentConversation.partner} />
      </Box>
    </>
  );
}
