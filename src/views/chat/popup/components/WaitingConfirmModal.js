import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Container } from "@mui/material";
import pairingImg from "../img/pairing.png"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WaitingConfirmModal(props) {

  const handleKeepWaiting = () => {
    props.oncloseModal();
  };

    const handleCancelWaiting = () => {
      props.oncloseModal();
      props.onCanclPairing();
    };

  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleKeepWaiting}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Stuck in finding partner</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            It seem you are waiting a bit long, do you still want to continue
            finding partner?
          </DialogContentText>
          <img width="100%" src={pairingImg}></img>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelWaiting}>Cancel</Button>
          <Button onClick={handleKeepWaiting}>Continute</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
