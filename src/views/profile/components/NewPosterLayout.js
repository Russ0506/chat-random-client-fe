import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import vybat from "../../chat/rightBar/img/anAva.jpg";

const shapeStyles = {
  bgcolor: "primary.main",
  width: 60,
  height: 60,
  padding: 4,
  backgroundColor: "#fff",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};
const shapeCircleStyles = { borderRadius: "50%" };
const ContentDesc = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  outline: "none",
  border: "none",
  fontSize: 18,
  paddingLeft: "5px",
  marginTop: "15px",
}));

const SharedInfoButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: 20,
  right: 20,
  fontSize: 14,
  padding: "10px 25px",
  borderRadius: "20px",
  backgroundColor: "#2EE59D",
  boxShadow: "0px 10px 15px rgba(46, 229, 157, 0.4)",
  color: "#fff",
  transition: "boxShadow 0.3s ease 0s",
  "&:hover": {
    backgroundColor: "#2EE59D",
    boxShadow: "0px 10px 15px rgba(46, 229, 157, 0.4)",
    color: "#fff",
    // transform: "translate(-50%, -7px)",
  },
}));
export default function NewPosterLayout() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [uploadImg, setUploadImg] = React.useState(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: uploadImg == true ? "calc(30vw + 400px)" : "30vw",
    // height: "80vh",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    padding: 0,
    // p: 4,
  };

  const AvatarFrame = styled(Box)(({ theme }) => ({
    ...shapeCircleStyles,
    ...shapeStyles,
    "&::before": {
      borderRadius: "50%",
      zIndex: "-1",
      content: '""',
      display: "block",
      height: "100%",
      width: "100%",
      backgroundImage: `url(${vybat})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
  }));

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
        <Box sx={style} className="modal-container">
          <Box sx={{ mt: 1 }} className="modal-title">
            <Typography variant="h5" textAlign="center">
              New Poster
            </Typography>
            <Divider variant="middle" sx={{ pt: 1, pb: 0, ml: 1, mr: 1 }} />
          </Box>
          <Stack flexDirection="row">
            <Box
              sx={{
                width: uploadImg == true ? "calc(100% - 400px)" : "100%",
                height: "500px",
                position: "relative",
                // pt: 1,
                borderRight: "1px solid #e0e0e0",
              }}
            >
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
                <Typography sx={{ mb: 2 }}>
                  Choose your image and drag into here
                </Typography>
              </Box>
            </Box>
            {uploadImg == true ? (
              <Box className="content-poster-lt" sx={{ width: "400px", p: 1 }}>
                <Stack
                  className="ct-pt-title"
                  flexDirection="row"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <AvatarFrame />
                  <Typography variant="h6" sx={{ fontWeight: 550, ml: 1 }}>
                    Thuy An
                  </Typography>
                </Stack>
                <ContentDesc
                  aria-label="minimum height"
                  minRows={9}
                  placeholder="Write what you are feeling..."
                />
                <SharedInfoButton variant="contained">
                  Share Infomation
                </SharedInfoButton>
              </Box>
            ) : (
              <></>
            )}
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
