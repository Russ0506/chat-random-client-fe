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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} />;
});

export default function BlockDialog(props) {
  function handleSubmitReport() {
    props.onClose();
  }

  function handleCancelReport() {
    props.onClose();
  }

  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth
        onClose={handleCancelReport}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <h5 className="card-title">
              <Stack alignItems="center" flexDirection="row">
                <BlockIcon sx={{ mr: 1 }} /> BLOCK
              </Stack>
            </h5>
          </div>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Input
                name="userId"
                type="hidden"
                value={props.data.userId}
                sx={{ display: "none" }}
              />
              <Typography variant="body2">
                <strong>Name:</strong> {props.data.userName}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {props.data.email}
              </Typography>
              <Input
                disabled={false}
                fullWidth
                value=""
                disableUnderline
                //   onChange={(event) => setMessage(event.target.value)}
                aria-label="minimum height"
                minRows={5}
                placeholder="Type reason block..."
                multiline
                sx={{
                  mt: 1,
                  borderRadius: "10px",
                  border: "1px solid #f6f6f6",
                  padding: "10px 5px",
                  // background: "#f6f6f6",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                  // border: "1px solid black"
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ marginBottom: 1 }}>
            <Button onClick={handleCancelReport}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitReport}
              sx={{ marginLeft: 1, marginRight: 1 }}
            >
              Report
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
