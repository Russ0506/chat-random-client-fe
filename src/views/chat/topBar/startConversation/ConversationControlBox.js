import { Box, Button, Stack, Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDataSearch } from "../../../../features/user-setting";
import Iconify from "../../../common/base/icon/Iconify";
import PairingSuccessModal from "../../popup/components/PairingSuccessModal";
import WaitingConfirmModal from "../../popup/components/WaitingConfirmModal";
import PartnerSettingModal from "../../popup/PartnerSettingModal";
import Snackbar from "@mui/material/Snackbar";


let pairingInterval = setInterval(() => {}, 1000);
export default function ConversationControlBox() {
  const dispatch = useDispatch();
  const [pairing, setPairing] = useState(false);
  const [userSetting, setUserSetting] = useState(null);
  const [openPartnerDialog, setOpenPartnerDialog] = useState(false);
  const [openWaitingModal, setOpenWaitingModal] = useState(false);
  const [openPairingSuccessModal, setOpenPairingSuccessModal] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);
  let time = 0;
  function counterTm() {
    ++time;
    if (time == 5) {
      setOpenWaitingModal(true);
    }
  }
  useLayoutEffect(() => {
    dispatch(getDataSearch())
      .unwrap()
      .then((data) => {
        setUserSetting(data);
        setFinishLoading(true);
      })
      .catch(() => {});
  }, []);

  function startPairing() {
    setPairing(true);
  }

  function handlePairing() {
    startPairing(true);
    pairingInterval = setInterval(counterTm, 1000);

    // setTimeout(() => {
    //   enqueueSnackbar("This is a success message!", { variant: "success" });
    // }, 10000);
  }

  const handleOpenSettingModal = () => {
    setOpenPartnerDialog(true);
  };

  const handleCloseSettingModal = () => {
    setOpenPartnerDialog(false);
  };

  function cancelPairing() {
    setPairing(false);
    setOpenPairingSuccessModal(false);
    clearInterval(pairingInterval);
    pairingInterval = null;
    time = 0;
  }

  function handleCloseWaitingModal() {
    setOpenWaitingModal(false);
  }

  return (
    <>
      {finishLoading === true ? (
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            onClick={pairing == false ? handleOpenSettingModal : cancelPairing}
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
      ) : (
        <></>
      )}
      <PartnerSettingModal
        open={openPartnerDialog} // status modal event listenter
        onClose={handleCloseSettingModal} // close modal event listener
        onParing={handlePairing} // waiting pairing event listener
        userSetting={userSetting} // pairing setting
      />
      {/* <WaitingConfirmModal
        open={openWaitingModal} // status modal event listener
        oncloseModal={handleCloseWaitingModal} // close modal event listener
        onCanclPairing={cancelPairing}
      /> */}
      {/* <PairingSuccessModal
        open={openPairingSuccessModal}
        onClose={cancelPairing}
      /> */}
    </>
  );
}
