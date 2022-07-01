import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Divider, Modal, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";



export default function NewPosterLayout() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [uploadImg, setUploadImg] = React.useState(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: uploadImg == true ? "calc(30vw + 300px)" : "30vw",
    height: "80vh",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "300px",
    boxShadow: "none",
    backgroundColor: "#262525",
    minWidth: "250px",
  }));

  const UploadFileIcon = styled(CloudUploadIcon)(({ theme }) => ({
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    color: "#000",
    fontSize: "100px",
    // transition: "all 0.3s ease 0s",
    // "&:hover": {
    //   backgroundColor: "#2EE59D",
    //   boxShadow: "0px 15px 20px rgba(46, 229, 157, 0.4)",
    //   color: "#fff",
    //   transform: "translate(-50%, -7px)",
    // },
  }));

  const StyledAddIcon = styled(AddIcon)(({ theme }) => ({
    fontSize: "3rem",
    transition: "0.2s ease-in-out",
    "&:hover": {
      fontSize: "4.2rem",
    },
    // "& .css-1bwcmsk-MuiSvgIcon-root": {
    //   fontSize: "6rem",
    // },
  }));

  return (
    <>
      <Item onClick={handleOpen}>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <StyledAddIcon style={{ color: "white" }} />
        </Stack>
      </Item>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Box sx={{width : uploadImg == true ? "calc(100% - 300px)" : "100%", height: "100%",position: "relative"}}>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ marginTop: "-20px" }}
            >
              New Poster
            </Typography>
            <Divider
              variant="middle"
              sx={{ width: "100%", mt: 1, mb: 2, ml: 1, mr: 1 }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <UploadFileIcon />
              <Typography>Choose your image and drag into here</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
