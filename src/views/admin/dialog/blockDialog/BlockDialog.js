import BlockIcon from "@mui/icons-material/Block";
import { Fade, Input, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
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
                type="hidden"
                value={props.data.userId}
                sx={{ display: "none" }}
              />
              <Typography conponent="div">
                <strong>You sure to block this user?</strong>
              </Typography>
              <Input
                fullWidth
                name = "reasonBlock"
                disableUnderline
                aria-label="minimum height"
                minRows={5}
                placeholder="Type reason block..."
                multiline
                sx={{
                  mt: 1,
                  borderRadius: "10px",
                  border: "1px solid #f6f6f6",
                  padding: "10px 5px",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
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
              Block
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}
