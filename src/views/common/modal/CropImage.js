import { Box, Modal, Button, Dialog, Fade, DialogContent, DialogActions } from "@mui/material";
import React from "react";
import ReactCrop from "react-image-crop";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={true} ref={ref} {...props} unmountOnExit />;
});
const CropImage = ({
  src,
  open,
  style,
  crop,
  onImageLoaded,
  onCropChange,
  handleClose,
  onCropComplete,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      id="des-txtarea-desc"
    >
      <DialogContent>
          {src && (
            <ReactCrop
            style={{maxHeight :"100%"}}
              src={src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
          )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropImage;
