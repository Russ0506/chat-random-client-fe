import { Box, Button, Stack, Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDataSearch } from "../../../../features/user-setting";
import Iconify from "../../../common/base/icon/Iconify";
import WaitingConfirmModal from "../../popup/components/WaitingConfirmModal";
import PartnerSettingModal from "../../popup/PartnerSettingModal";

export default function ConversationControlBox() {
  const dispatch = useDispatch();
  const [pairing, setPairing] = useState(false);
  const [userSetting, setUserSetting] = useState(null);
  const [openPartnerDialog, setOpenPartnerDialog] = useState(false);
  const [continuteWaiting, setContinuteWaiting] = useState(false);
  useLayoutEffect(() => {
    dispatch(getDataSearch())
      .unwrap()
      .then((data) => {
        setUserSetting(data);
      })
      .catch(() => {});
  }, []);

  function cancelPairing() {
    setPairing(false);
  }
  function startPairing() {
    setPairing(true);
  }

  function handlePairing() {
    startPairing(true);
    let time = 0;
    setInterval(() => {
      ++time;
      if (time == 5) {
        // alert("continue to waiting?");
        setContinuteWaiting(true);
      }
    }, 1000);
  }

  const handleOpenModal = () => {
    setOpenPartnerDialog(true);
  };

  const handleCloseModal = () => {
    setOpenPartnerDialog(false);
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
          onClick={pairing == false ? handleOpenModal : cancelPairing}
          sx={{ boxShadow: "0px 8px 10px rgb(237 221 255)" }}
          endIcon={
            pairing == false ? (
              <Iconify
                display={{ xs: "none", md: "inline-block" }}
                icon={"mdi:chat-plus-outline"}
              />
            ) : (
              <Iconify
                display={{ xs: "none", md: "inline-block" }}
                icon={"eos-icons:bubble-loading"}
              />
            )
          }
        >
          {pairing == false ? (
            <>
              <Iconify
                width="27px"
                height="27px"
                display={{ xs: "inline-block", md: "none" }}
                icon={"mdi:chat-plus-outline"}
              />
              <Typography
                variant="button"
                sx={{ display: { xs: "none", md: "inline-block" } }}
              >
                New Conversation
              </Typography>
            </>
          ) : (
            <>
              <Iconify
                width="27px"
                height="27px"
                display={{ xs: "inline-block", md: "none" }}
                icon="eos-icons:bubble-loading"
              />
              <Typography
                variant="button"
                sx={{ display: { xs: "none", md: "inline-block" } }}
              >
                Pairing...
              </Typography>
            </>
          )}
        </Button>
        {/* <Typography color="black">Time here</Typography> */}
      </Stack>
      <PartnerSettingModal
        open={openPartnerDialog} // status modal event listenter
        onClose={handleCloseModal} // close modal event listener
        onParing={handlePairing} // waiting pairing event listener
        userSetting={userSetting} // pairing setting
      />
      <WaitingConfirmModal open={continuteWaiting}/>
    </>
  );
}
