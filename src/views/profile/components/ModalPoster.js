import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { Paper } from "@mui/material";


const BoxModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "60vh",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  outline: "none",
  
}));


export default function ModalPoster() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "180px",
    boxShadow: "none",
    backgroundColor: "gray",
    cursor: "pointer",
  }));
  return (
    <div>
      <Item onClick={handleOpen}>Open modal</Item>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <BoxModal></BoxModal>
      </Modal>
    </div>
  );
}
