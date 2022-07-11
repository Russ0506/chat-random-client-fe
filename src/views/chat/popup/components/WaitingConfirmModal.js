import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Container } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WaitingConfirmModal(props) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Stuck in finding partner</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            It seem you are waiting a bit long, do you still want to continute
            finding partner?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Container maxWidth="xl" >
            <Button /* onClick={handleClose} */>Cancel</Button>
            <Button /* onClick={handleClose} */>Continute</Button>
          </Container>
        </DialogActions>
      </Dialog>
    </div>
  );
}
