import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import myIdol from "../components/img/myidol.jpg";
import { styled } from "@mui/styles";
import { IconButton, Input, Stack, Typography, Zoom } from "@mui/material";
// import DropBox from './DropBox';
import { Box } from "@mui/system";
import Iconify from "../../common/base/icon/Iconify";
// import EmojiPicker from "../../common/base/emoji/EmojiPicker"; // ko xoa nha
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import { CmmnFormControl } from "../../chat/popup/components/CmmnFormControl";
import GgmApiForPost from "./GgmApiForPost";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "react-image-crop/dist/ReactCrop.css";
import { axiosMultipartForm } from "../../../setup/axiosClient";
import styles from "../../../styles/newposterchat-layout.scss";
import CropImage from "../../common/modal/CropImage";
import { Form, FormLabel } from "react-bootstrap";
import StyledCloseIcon from "../../common/base/style-icon/StyledCloseIcon";

// import InputEmoji from "react-input-emoji"; // ko xoa nha
// import Picker from "emoji-picker-react"; // ko xoa nha
// import EmojiTextarea from "react-emoji-textarea"; // ko xoa nha

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} in={true} />;
});
function defaultHandle() {
  return false;
}

export default function NewPosterLayout({
  open = true,
  onClose = defaultHandle(),
  userDisplayName,
  avatarPath
}) {
  const [isPost, setIsPost] = useState(false);
  const [openModal, setOpenModal] = useState(open);
  const fileInputRef = React.useRef(null);
  const [message, setMessage] = useState("");
  const [openLocationBox, setOpenLocationBox] = useState(false);
  const [location, setLocation] = useState({
    addr: "",
    lo: "",
    lat: "",
  });
  const [usingLocation, setUsingLocation] = useState(false);

  // state for image crop :
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    // aspect: 16 / 9,
  });
  const [src, setSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [openCropImgModal, setOpenCropImgModal] = useState();
  const [fileUrl, setFileUrl] = useState("");
  const [imageRef, setImageRef] = useState(null);
  const URL = "posts";

  const handleCloseModal = () => {
    onClose();
    setOpenModal(false);
  };
  const handleCloseSubmit = () => {
    onClose();
    setOpenModal(false);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return "";
    }
  };

  function handleOpenLocationBox() {
    if (usingLocation === true) {
      setUsingLocation(false);
      setLocation({ addr: "", lo: "", la: "" });
    } else {
      setOpenLocationBox(true);
    }
  }

  function backLocationToPost(isUsed) {
    setUsingLocation(isUsed === true ? true : false);
    setOpenLocationBox(false);
  }
  function backLocationToPostTitle() {
    setOpenLocationBox(false);
  }

  // handle crop image
  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    setCrop(crop);
  };

  async function makeClientCrop(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        "newFile.jpeg"
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  }

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
    handleOpen();
  };

  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(fileUrl);
          const f1 = window.URL.createObjectURL(blob);
          resolve(f1);
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            dataURLtoFile(reader.result, "cropped.jpg");
          };
        },
        "image/jpeg",
        1
      );
    });
  }

  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    setCroppedImage(croppedImage);
  }

  const submitPost = (event) => {
    setIsPost(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    data.append("image", croppedImage, "imagename");
    const params = {
      post: {
        caption: data.get("caption"),
        image: data.get("image"),
        location: location.addr,
      },
    };

    const formData = new FormData();
    for (let param in params["post"]) {
      formData.append(`post[${param}]`, params["post"][param]);
    }

    axiosMultipartForm
      .post(`${URL}`, formData)
      .then((data) => {
        onClose(data.data);
      })
      .catch(() => {});
  };
  const handleOpen = () => setOpenCropImgModal(true);
  const handleClose = () => setOpenCropImgModal(false);

  const clearImage = () => {
    setCroppedImageUrl("");
  };

  // end handle crop image

  // css
  const boxUploadImage = {
    margin: "0",
    overflow: "auto",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    padding: "100px",
    border: "1px solid",
    textShadow: " 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
  };

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "1px solid rgb(157, 168, 183)",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  return (
    <>
      <CropImage
        src={src}
        open={openCropImgModal}
        style={style}
        crop={crop}
        onImageLoaded={onImageLoaded}
        onCropChange={onCropChange}
        handleClose={handleClose}
        onCropComplete={onCropComplete}
      ></CropImage>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-describedby="alert-dialog-slide-description"
        id="des-txtarea-desc"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1
          }}
        >
          {openLocationBox === true ? (
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              size="medium"
              onClick={backLocationToPostTitle}
            >
              <Typography variant="body1">Search Your Location</Typography>
            </Button>
          ) : (
            <Typography variant="h6">New Post</Typography>
          )}
          <IconButton onClick={handleCloseModal} size="small">
            <CloseIcon sx={{ width: "30px", height: "30px" }} />
          </IconButton>
        </DialogTitle>
        {openLocationBox === true ? (
          <DialogContent
            sx={{ position: "relative", minHeight: "420px", marginTop: 0 }}
          >
            <LocationFormControl variant="standard">
              <GgmApiForPost
                reponseLocation={setLocation}
                onBack={backLocationToPost}
              />
            </LocationFormControl>
          </DialogContent>
        ) : (
          <>
            <DialogContent>
              <DialogContentText
                component={Form}
                id="newPostForm"
                onSubmit={submitPost}
              >
                <Stack
                  className="ct-pt-title"
                  flexDirection="row"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <AvatarFrame avatarPath={avatarPath} />
                  <Stack justifyContent="space-evenly" sx={{ml: 1}}>
                    <Typography sx={{ fontWeight: 550, ml: 1 }}>
                      {userDisplayName ?? "chưa làm API get tên, get avatar"}
                    </Typography>

                    {usingLocation === true ? (
                      <Stack justifyContent="center" flexDirection="row" alignItems="center" sx={{mt: 0.5, ml: 0.5}}>
                        <LocationOnIcon />
                        <Typography
                        variant="subtitle2"
                          component="p"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "300px",
                          }}
                        >
                          {location.addr}
                        </Typography>
                      </Stack>
                    ) : (
                      <></>
                    )}
                  </Stack>
                </Stack>

                <Input
                  name="caption"
                  disabled={false}
                  fullWidth
                  value={message}
                  disableUnderline
                  onKeyUp={handleKeyUp}
                  onChange={(event) => setMessage(event.target.value)}
                  aria-label="minimum height"
                  minRows={4}
                  placeholder="Write what you are feeling..."
                  multiline
                  sx={{
                    mt: 1,
                    borderRadius: "10px",
                    padding: "10px 10px",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                  }}
                  endAdornment={
                    <Stack sx={{ position: "relative" }}>
                      {/* <EmojiPicker
                        disabled={false}
                        value={message}
                        setValue={setMessage}
                        sx={{
                          zIndex: 100,
                          position: "absolute",
                          bottom: "5px",
                          right: "5px",
                        }}
                      /> */}
                      {/* <InputEmoji
                          value={message}
                          onChange={setMessage}
                          placeholder="Type a message"
                        /> */}

                      {/* <IconButton
                        disabled={false}
                        size="small"
                        // onClick={triggerPicker}
                      >
                        <Iconify
                          icon={"eva:smiling-face-fill"}
                          width={20}
                          height={20}
                        />
                      </IconButton> */}
                    </Stack>
                  }
                />
              </DialogContentText>
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                }}
              >
                {croppedImageUrl ? (
                  <>
                    <Box
                      borderRadius={4}
                      sx={{
                        margin: "0",
                        overflow: "auto",
                      }}
                    >
                      <img
                        value="croppedImageUrl"
                        alt="Crop"
                        width="100%"
                        src={croppedImageUrl}
                      />
                    </Box>
                    <IconButton
                      sx={{ position: "absolute", top: "2px", right: "7px" }}
                    >
                      <StyledCloseIcon
                        onClick={clearImage}
                        sx={{
                          color: "#606770",
                          background: "rgba(255,255,255,.8)",
                          width: "25px",
                          height: "25px",
                        }}
                      />
                    </IconButton>
                  </>
                ) : (
                  <></>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <DialogContent>
                <Stack width="100%" flexDirection="column">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{
                      flexShrink: 0,
                      mr: 1.5,
                      width: "100%",
                      borderRadius: 4,
                      padding: 1,
                      border: "1px solid #e5e0e0",
                    }}
                  >
                    <Typography>Add to your post</Typography>
                    <Stack flexDirection="row">
                      <IconButton
                        disabled={false}
                        size="small"
                        sx={{ width: 37, height: 37 }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          id="file-input"
                          className="upload"
                          onChange={onSelectFile}
                          hidden
                        />

                        <label
                          htmlFor="file-input"
                          style={{ margin: 0, padding: 0 }}
                        >
                          <Iconify
                            icon="ic:round-add-photo-alternate"
                            width={22}
                            height={22}
                          />
                        </label>
                      </IconButton>

                      <IconButton
                        disabled={false}
                        size="small"
                        onClick={handleOpenLocationBox}
                        sx={{
                          background:
                            usingLocation === true ? "rgb(236, 236, 250)" : "",
                          width: 37,
                          height: 37,
                          ml: "5px",
                        }}
                      >
                        <LocationOnIcon />
                      </IconButton>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                      />
                    </Stack>
                  </Stack>

                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isPost}
                    sx={{ mt: 2, mb: 0 }}
                    form="newPostForm"
                  >
                    Post
                  </Button>
                </Stack>
              </DialogContent>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

const AvatarFrame = styled(Box)(({ theme, avatarPath }) => ({
  ...shapeCircleStyles,
  ...shapeStyles,
  "&::before": {
    borderRadius: "50%",
    zIndex: "-1",
    content: '""',
    display: "block",
    height: "100%",
    width: "100%",
    backgroundImage: `url(${avatarPath})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    background: "gray"
  },
}));

const shapeStyles = {
  bgcolor: "primary.main",
  width: 60,
  height: 60,
  padding: 1,
  backgroundColor: "#fff",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};
const shapeCircleStyles = { borderRadius: "50%" };

const LocationFormControl = styled(CmmnFormControl)(({ theme }) => ({
  marginTop: "0px !important",
  width: "100%",
  "& .MuiFormControl-root.MuiFormControl-fullWidth.MuiTextField-root": {
    marginTop: 0,
  },
}));
