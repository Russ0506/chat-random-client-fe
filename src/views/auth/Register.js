import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { GRP_COLOR, FONT_SIZE } from "../../constant/css_constant";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Loading from "../common/base/loading/Loading";
import Select from "react-select";
import { axiosClient, axiosMultipartForm } from "../../setup/axiosClient";
import "react-image-crop/dist/ReactCrop.css";
import { Fade, Slide, Stack, Zoom } from "@mui/material";
import bgNew from "../auth/img/conv.png";
import CropImage from "../common/modal/CropImage";
const URL = "users";

class SignUp extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 16,
      },
      open: false,
      selectedDate: new Date(),
      isSubmit: false,
      message: "",
      options: [],
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }

    this.handleOpen();
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
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
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            this.dataURLtoFile(reader.result, "cropped.jpg");
          };
        },
        "image/jpeg",
        1
      );
    });
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage: croppedImage });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isSubmit: "true",
    });
    const data = new FormData(event.currentTarget);

    data.append("image", this.state.croppedImage, "imagename");
    const params = {
      user: {
        first_name: data.get("firstName"),
        last_name: data.get("lastName"),
        birthday: this.state.selectedDate,
        email: data.get("email"),
        password: data.get("password"),
        gender: data.get("gender"),
        time_zone: data.get("time_zone"),
        avatar: data.get("image"),
      },
    };

    const formData = new FormData();
    for (let param in params["user"]) {
      formData.append(`user[${param}]`, params["user"][param]);
    }

    axiosMultipartForm
      .post(`${URL}`, formData)
      .then((data) => {
        if (data.success) {
          window.location.replace("register/email-success");
        }
      })
      .catch(() => {
        this.setState({ isSubmit: false });
      });
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });
  handleDateChange(date) {
    this.setState({ selectedDate: date });
  }

  style = {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  componentDidMount() {
    axiosClient.get(`time_zones.json`).then((data) => {
      this.setState({
        options: data.time_zones.map((it) => ({ value: it, label: it })),
      });
    });
  }

  render() {
    const { crop, croppedImageUrl, src, croppedImage } = this.state;

    return (
      <Box
        sx={{
          bgcolor: GRP_COLOR.WHITECODE,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Loading show={this.state.isSubmit}></Loading>
        <CropImage
          src={src}
          open={this.state.open}
          style={this.style}
          crop={crop}
          onImageLoaded={this.onImageLoaded}
          onCropChange={this.onCropChange}
          handleClose={this.handleClose}
          onCropComplete={this.onCropComplete} >
        </CropImage>

        <Grid
          container
          spacing={0}
          sx={{
            width: "100%",
            height: "100%",
            zIndex: 10,
            overflow: "auto",
          }}
          columns={{ xs: 1, md: 2 }}
        >
          <Box position="fixed" sx={{ height: "100%", top: 0, left: 0 }}>
            <Stack
              display={{ xs: "none", md: "flex" }}
              sx={{
                width: "400px",
                height: "100%",
                background: "rgb(190,181,242)",
                background:
                  "linear-gradient(180deg, #b8abff, rgba(129,124,206,1) 55%, rgba(132,115,218,1) 100%)",
                position: "relative",
              }}
              justifyContent="center"
            >
              <Box sx={{ width: "100%", padding: 5 }}>
                <Slide direction="right" in={true} timeout={700}>
                  <Box>
                    <Fade in={true} timeout={1000}>
                      <Typography
                        variant="h2"
                        color="#fff"
                        sx={{ fontWeight: 700, lineHeight: 1.1 }}
                      >
                        Adventure Starts Here
                      </Typography>
                    </Fade>
                  </Box>
                </Slide>
                <Fade in={true} timeout={1000}>
                  <Typography color="#fff">
                    Create an account to join the community and finding your
                    friends!
                  </Typography>
                </Fade>
              </Box>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Zoom in={true} timeout={700}>
                    <img src={`${bgNew}`} alt="registCover" width="100%" />
                  </Zoom>
                </Box>
              </Fade>
            </Stack>
          </Box>
          <Box paddingLeft={{ xs: 0, md: "400px", width: "100%" }}>
            <Container
              sx={{ mt: 5, mb: 5 }}
              component="div"
              maxWidth="xs"
              className={this.state.isSubmit ? "opacity-background" : ""}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  overflow: "auto",
                  height: "100%",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  fontSize={FONT_SIZE.formHeader}
                >
                  Sign Up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={this.handleSubmit}
                  sx={{ mt: 3, fontSize: FONT_SIZE.smallText }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Enter Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="re-password"
                        label="Confirm Password"
                        type="password"
                        id="re-password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label="Birthday"
                          value={this.state.selectedDate}
                          minDate={new Date("1920-01-01")}
                          maxDate={new Date()}
                          onChange={this.handleDateChange}
                          renderInput={(params) => <TextField {...params} />}
                          id="birthday"
                          name="birthday"
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Gender
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="gender"
                          id="gender"
                          defaultValue="female"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel>Time zome</FormLabel>
                        <Select options={this.state.options} name="time_zone" />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Box pb={3}>
                        <TextField
                          type="file"
                          accept="image/*"
                          onChange={this.onSelectFile}
                          multiple
                        />
                      </Box>
                      {croppedImageUrl && (
                        <img
                          value="croppedImageUrl"
                          alt="Crop"
                          style={{ maxWidth: "100%" }}
                          src={croppedImageUrl}
                        />
                      )}
                      <input
                        type="image"
                        name="avatar"
                        hidden
                        value={croppedImageUrl}
                      ></input>
                    </Grid>
                  </Grid>
                  {this.state.message ? (
                    <Box
                      component="div"
                      variant="h5"
                      color="red"
                      fontSize={FONT_SIZE.smallText}
                    >
                      {this.state.message}
                    </Box>
                  ) : (
                    ""
                  )}
                  <Stack alignItems="flex-start" sx={{ mt: 1 }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        // background: "#ff6392e6",
                        boxShadow: "none",
                        // width: "200px",
                      }}
                    >
                      Sign Up
                    </Button>
                    <Stack flexDirection="row" marginTop={2}>
                      <Typography variant="body1">
                        Already have an account?
                      </Typography>
                      <Link
                        href="/users/login"
                        variant="body2"
                        marginLeft="5px"
                      >
                        <Typography variant="body1">Sign in</Typography>
                      </Link>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Container>
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default SignUp;
