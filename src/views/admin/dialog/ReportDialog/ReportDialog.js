import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Fade, Input, Stack, TextField, Typography } from "@mui/material";
import Iconify from "../../../common/base/icon/Iconify";
import BlockIcon from "@mui/icons-material/Block";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Card } from "react-bootstrap";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} />;
});

export default function ReportDialog(props) {
  function handleSubmitReport() {
    props.onClose();
  }

  function handleCancelReport() {
    props.onClose();
  }

  return (
    <>
      <Dialog
        open={props.open ?? true}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        onClose={handleCancelReport}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Card style={{ width: "100%", marginTop: "20px" }}>
            <Card.Body>
              <Card.Title>Conversation ID: #1345111</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <div>
                  <strong>Reporter:</strong> Hoang Kim Duc
                </div>
                <div>
                  <strong>Email:</strong> Ducbede@gmail.com
                </div>
              </Card.Subtitle>
              <Card.Text>
                <strong>Reason: </strong>Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </DialogContent>
        <DialogActions sx={{ marginBottom: 1 }}>
          <Button onClick={handleCancelReport}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmitReport}
            sx={{ marginLeft: 1, marginRight: 1 }}
          >
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
