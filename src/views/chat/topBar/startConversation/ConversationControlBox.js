import {
  Alert,
  AlertTitle,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDataSearch } from "../../../../features/user-setting";
import Iconify from "../../../common/base/icon/Iconify";
import PartnerSettingModal from "../../popup/PartnerSettingModal";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/styles";
import { pairingSocket } from "../../../sockets/Socket";
import {
  selectNewestConversations
} from "../../../../features/chat/conversationSlice";
import { useSelector } from "react-redux";


let pairingInterval = setInterval(() => {}, 1000);
export default function ConversationControlBox() {
  const dispatch = useDispatch();
  const [pairing, setPairing] = useState(false);
  const [userSetting, setUserSetting] = useState(null);
  const [openPartnerDialog, setOpenPartnerDialog] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);
  const [openWaitingModal, setOpenWaitingModal] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "left",
  });
  const [openPairingSuccessModal, setOpenPairingSuccessModal] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const newConversation = useSelector(selectNewestConversations);

  let time = 0;
  function counterTm() {
    ++time;
    if (time === 5 && pairing === true) {
      handleOpenWaitingModal();
    }
  }

  useEffect(() => {
    pairingSocket();
  }, []);

  useEffect(() => {
    if (newConversation) {
      setPairing(false);
      handleOpenPairingSuccess();
    }
  }, [newConversation]);

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
  }

  const handleOpenSettingModal = () => {
    setOpenPartnerDialog(true);
  };

  const handleCloseSettingModal = () => {
    setOpenPartnerDialog(false);
  };

  function cancelPairing() {
    setPairing(false);
    handleClosePairingSuccess();
    handleCloseWaitingModal();
    clearInterval(pairingInterval);
    pairingInterval = null;
    time = 0;
  }

  function continuePairing() {
    setPairing(true);
    handleCloseWaitingModal();
  }

  function handleCloseWaitingModal() {
    setOpenWaitingModal({
      ...openWaitingModal,
      open: false,
    });
  }

  function handleOpenWaitingModal() {
    setOpenWaitingModal({
      ...openWaitingModal,
      open: true,
    });
  }

  function handleOpenPairingSuccess() {
    setOpenPairingSuccessModal({
      ...openPairingSuccessModal,
      open: true,
    });
  }
  function handleClosePairingSuccess() {
    setOpenPairingSuccessModal({ ...openPairingSuccessModal, open: false });
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
            onClick={pairing === false ? handleOpenSettingModal : cancelPairing}
            sx={{ boxShadow: "0px 8px 10px rgb(237 221 255)" }}
            endIcon={
              pairing === false ? (
                <Iconify icon={"mdi:chat-plus-outline"} />
              ) : (
                <Iconify icon={"eos-icons:bubble-loading"} />
              )
            }
          >
            {pairing === false ? (
              <Typography variant="button">New Conversation</Typography>
            ) : (
              <Typography variant="button">Pairing...</Typography>
            )}
          </Button>
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
      />
      <PairingSuccessModal
        open={openPairingSuccessModal}
        onClose={cancelPairing}
      /> */}

      <Snackbar
        anchorOrigin={openPairingSuccessModal}
        open={openPairingSuccessModal.open}
        onClose={handleClosePairingSuccess}
        autoHideDuration={6000}
        message="You have matched a partner!"
        // key={
        //   openPairingSuccessModal.vertical + openPairingSuccessModal.horizontal
        // }
      >
        <Alert
          onClose={handleClosePairingSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          You have matched a partner!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={openWaitingModal}
        open={openWaitingModal.open}
        onClose={handleCloseWaitingModal}
        key={
          openPairingSuccessModal.vertical + openPairingSuccessModal.horizontal
        }
      >
        <Alert severity="warning" sx={{ backgroundColor: "#282c34" }}>
          <Stack flexDirection="column" maxWidth="md">
            <AlertTitle color="#fff">
              "Patient is a good virtue, and your partner will love you for that"
            </AlertTitle>
            <Stack
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
              marginTop={2}
            >
              <Button
                size="small"
                sx={{ color: "#e06c75" }}
                onClick={cancelPairing}
              >
                Cancel
              </Button>
              <Button
                size="small"
                sx={{ marginLeft: "10px", color: "#98b379" }}
                onClick={continuePairing}
              >
                Keep Waiting
              </Button>
            </Stack>
          </Stack>
        </Alert>
      </Snackbar>
    </>
  );
}
