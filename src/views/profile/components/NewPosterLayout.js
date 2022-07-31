import { IconButton, Input, Stack, Typography, Zoom } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/styles";
import React, { useState } from "react";
// import DropBox from './DropBox';
import { Box } from "@mui/system";
import Iconify from "../../common/base/icon/Iconify";
// import EmojiPicker from "../../common/base/emoji/EmojiPicker"; // ko xoa nha
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "react-image-crop/dist/ReactCrop.css";
import { axiosMultipartForm } from "../../../setup/axiosClient";
import { CmmnFormControl } from "../../chat/popup/components/CmmnFormControl";
import GgmApiForPost from "./GgmApiForPost";
import styles from "../../../styles/newposterchat-layout.scss";
import { Form } from "react-bootstrap";
import StyledCloseIcon from "../../common/base/style-icon/StyledCloseIcon";
import StartBarCt from "../../common/error/StackBarCt";
import CropImage from "../../common/modal/CropImage";

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
  avatarPath,
  type = 'new',
  posterData = { image: '', content: '' },
}) {

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

  const [isPost, setIsPost] = useState(false);
  const [openModal, setOpenModal] = useState(open);
  const fileInputRef = React.useRef(null);
  const [openLocationBox, setOpenLocationBox] = useState(false);
  const [location, setLocation] = useState({
    addr: "",
    lo: "",
    lat: "",
  });
  const [usingLocation, setUsingLocation] = useState(false);

  // state for image crop :
  const [message, setMessage] = useState(posterData?.content);
  const [croppedImageUrl, setCroppedImageUrl] = useState(posterData?.image);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    aspect: 1 / 1,
  });
  const [src, setSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [openCropImgModal, setOpenCropImgModal] = useState();
  const [fileUrl, setFileUrl] = useState("");
  const [imageRef, setImageRef] = useState(null);
  const [openStb, setOpenStb] = useState(false)
  const URL = "posts";
  const [errorMessage, setErrorMessage] = useState('')
  let checkChangeUrlImg = false

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
    if (!validateFile(e.target.files[0])) {
      setErrorMessage("Image have to be in image format and under 2MB")
      setOpenStb(true)
      setIsPost(false)
      return;
    }
    if (e.target.files && e.target.files.length > 0) {
      checkChangeUrlImg = true
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
    event.preventDefault();
    setIsPost(true);

    if (!croppedImageUrl) {
      setErrorMessage("You have to add image to post")
      setOpenStb(true)
      setIsPost(false);
      return;
    } else {
      const data = new FormData(event.currentTarget);
      let params = {}

      if (checkChangeUrlImg) {
        data.append("image", croppedImage, "imagename");
        params = {
          post: {
            caption: data.get("caption"),
            image: data.get("image"),
            location: location.addr,
          },
        };
      } else {
        params = {
          post: {
            caption: data.get("caption"),
            image: croppedImageUrl,
            location: location.addr,
          },
        };
      }

      const formData = new FormData();
      for (let param in params["post"]) {
        formData.append(`post[${param}]`, params["post"][param]);
      }

      if (type === 'new') {
        axiosMultipartForm
          .post(`${URL}`, formData)
          .then((data) => {
            onClose(data.data);
          })
          .catch((error) => {
            setErrorMessage(error.response.statusText)
            setOpenStb(true)
            setIsPost(false)
          });
      } else {
        axiosMultipartForm
          .put(`${URL}/${posterData?.id}`, formData)
          .then((data) => {
            onClose(data.data);
          })
          .catch((error) => {
            setErrorMessage(error.response.statusText)
            setOpenStb(true)
            setIsPost(false)
          });
      }
    }
  };
  const handleOpen = () => setOpenCropImgModal(true);
  const handleClose = () => setOpenCropImgModal(false);

  const clearImage = () => {
    setCroppedImageUrl("");
    setCroppedImage(null)
  };

  // end handle crop image

  const handleCloseStb = () => {
    setOpenStb(false)
  }

  // validate file
  function validateFile(file = null) {
    if (!checkIfFilesAreTooBig(file)) {
      setErrorMessage("Your image have to in the right format and under 2MB")
      setOpenStb(true)
      setIsPost(false);
      return false
    }
    if (!checkIfFilesAreCorrectType(file)) {
      return false
    }
    return true;
  }

  function checkIfFilesAreTooBig(file) {
    let valid = true
    const size = file.size / 1024 / 1024
    if (size > 2) {
      valid = false
    }
    return valid
  }

  function checkIfFilesAreCorrectType(file) {
    let valid = true
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      valid = false
    }
    return valid
  }
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
      <StartBarCt openStb={openStb} closeStb={handleCloseStb} titleStb={errorMessage} typeNoti="error"></StartBarCt>
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
            <Typography sx={{ fontSize: "22px" }}>{type === 'new' ? "New Post" : "Update Post"}</Typography>
          )}
          <IconButton onClick={handleCloseModal}>
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
                  <Stack justifyContent="center">
                    <Typography sx={{ fontWeight: 550, ml: 1 }}>
                      {userDisplayName}
                    </Typography>

                    {usingLocation === true ? (
                      <Stack justifyContent="center" flexDirection="row">
                        <LocationOnIcon />
                        <Typography>{location.addr}</Typography>
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
                  minRows={2}
                  placeholder="Write what you are feeling..."
                  multiline
                  sx={{
                    mt: 1,
                    borderRadius: "10px",
                    padding: "10px 5px",
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
                    <Typography>  {type === 'new' ? "Add to your post" : "Update your post"}</Typography>
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
                    {type === 'new' ? "Post" : "Update Post"}
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
  },
}));

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

const LocationFormControl = styled(CmmnFormControl)(({ theme }) => ({
  marginTop: "0px !important",
  width: "100%",
  "& .MuiFormControl-root.MuiFormControl-fullWidth.MuiTextField-root": {
    marginTop: 0,
  },
}));
