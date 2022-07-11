import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import pairingSuccess from "../img/pairingSuccess.png";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PairingSuccessModal(props) {

  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Congratulate!</DialogTitle>

        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            variant="h4"
            color="#817cce"
            fontWeight="bold"
          >
            You have matched a partner!
          </DialogContentText>
          <img width="100%" src={pairingSuccess} alt=""></img>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={props.onClose}
            sx={{ position: "relative", bottom: 10, right: 10 }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
