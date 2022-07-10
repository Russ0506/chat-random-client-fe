import { Box, Button, Stack, Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDataSearch } from "../../../../features/user-setting";
import Iconify from "../../../common/base/icon/Iconify";
import PartnerSettingModal from "../../popup/PartnerSettingModal";

export default function ConversationControlBox() {
  const [continuteWait, setContinuteWait] = useState(true);
  function pairingCounter() {
    let time = 0;
    setInterval(() => {
      ++time;
      if(time == 5) {
        alert("continue to waiting?")
      }
    }, 1000);
  }

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getDataSearch())
      .unwrap()
      .then((data) => {
        setUserSetting(data);
      })
      .catch(() => {});
  }, []);

  const [userSetting, setUserSetting] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPartnerDialog, setOpenPartnerDialog] = useState(false);
  const [openPartnerViewDialog, setOpenPartnerViewDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenPartnerDialog(true);
  };

  const handleOpenViewSettingModal = () => {
    setOpenPartnerViewDialog(true);
  };

  const handlePartnerSettingClose = () => {
    setOpenPartnerDialog(false);
  };

  const handleParnerSettingViewClose = () => {
    setOpenPartnerViewDialog(false);
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          // onClick={handleClickOpen}
          onClick={pairingCounter}
          sx={{ boxShadow: "0px 8px 10px rgb(237 221 255)" }}
          endIcon={<Iconify icon={"mdi:chat-plus-outline"} />}
        >
          New Conversation
        </Button>
        {/* <Typography color="black">Time here</Typography> */}
      </Stack>
      <PartnerSettingModal
        open={openPartnerDialog}
        onClose={handlePartnerSettingClose}
        handleOpenViewSettingModal={handleOpenViewSettingModal}
        userSetting={userSetting}
      ></PartnerSettingModal>
    </>
  );
}
