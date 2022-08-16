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
import { Fade, IconButton, MenuItem, Slide, Stack, Zoom } from "@mui/material";
import bgNew from "../auth/img/conv.png";
import CropImage from "../common/modal/CropImage";
import StartBarCt from "../common/error/StackBarCt";
import StyledCloseIcon from "../common/base/style-icon/StyledCloseIcon";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const URL = "users";

class SignUp extends React.PureComponent {
  FILE_SIZE = 5242880;
  SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

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
      openStb: false,
      showPassword: false,
      showRePassword: false,
      isValidPhoto: true,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenStb = this.handleOpenStb.bind(this);
    this.handleCloseStb = this.handleCloseStb.bind(this);
    this.clearImage = this.clearImage.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  handleOpenStb = () => {
    this.setState({ openStb: true })
  }
  handleCloseStb = () => {
    this.setState({ openStb: false })
  }
  handleDateChange(date) {
    this.setState({ selectedDate: date });
  }

  handleStopChange(e) {
    e.preventDefault();
  };

  handleClickShowPassword(type) {
    if (type === 'password') this.setState({ showPassword: !this.state.showPassword })
    if (type === 'repassword') this.setState({ showRePassword: !this.state.showRePassword })
  }

  onSelectFile = (e) => {
    this.setState({isValidPhoto : this.validateFile(e.target.files[0])})
    if(!this.validateFile(e.target.files[0])) return;
    else {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
          this.setState({ src: reader.result })
        );
        reader.readAsDataURL(e.target.files[0]);
      }

      this.handleOpen();
    }
  };

  validateFile(file = null) {
    if(!this.checkIfFilesAreTooBig(file)) {
      return false
    }
    if(!this.checkIfFilesAreCorrectType(file)) {
      return false
    }
    return true;
  }

  checkIfFilesAreTooBig(file) {
    let valid = true
    const size = file.size / 1024 / 1024
    if (size > 2) {
      valid = false
    }
    return valid
  }

 checkIfFilesAreCorrectType(file) {
    let valid = true
    if (!this.SUPPORTED_FORMATS.includes(file.type)) {
      valid = false
    }
    return valid
  }

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

  handleSubmit(event) {
    // event.preventDefault();
    this.setState({
      isSubmit: "true",
    });
    // const data = new FormData(event);

    // if (this.state.croppedImage) data.append("image", this.state.croppedImage, "imagename");
    const params = {
      user: {
        first_name: event.firstName,
        last_name: event.lastName,
        birthday: this.state.selectedDate,
        email: event.email,
        password: event.password,
        gender: event.gender,
        avatar: (this.state.croppedImage) ? this.state.croppedImage : null,
      },
    };

    const formData = new FormData();
    for (let param in params["user"]) {
      formData.append(`user[${param}]`, params["user"][param]);
    }

    axiosMultipartForm
      .post(`${URL}`, formData)
      .then((data) => {
        if (data.data.success) {
          window.location.replace("register/email-success");
        }
      })
      .catch(
        function (error) {
          this.setState({ isSubmit: false });
          this.setState({ message: error.response.statusText })
          this.handleOpenStb()
          return Promise.reject(error)
        }.bind(this)
      );
  };

  clearImage() {
    this.setState({ croppedImageUrl: "" })
    this.setState({ src: null })
  }

  // css
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

  customAvatarField = {
    marginTop: "30px"
  }
  // end css

  componentDidMount() {
    axiosClient.get(`time_zones.json`).then((data) => {
      this.setState({
        options: data.time_zones.map((it) => ({ value: it, label: it })),
      });
    });
  }

  // yup validation

  initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    gender: "female",
    // photo: null,
  };

  SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Please enter more than 1 character')
      .max(50, 'Please enter less than 50 characters')
      .required('First Name Required'),
    lastName: Yup.string()
      .min(2, 'Please enter more than 1 character')
      .max(50, 'Please enter less than 50 characters')
      .required('Last Name Required'),
    email: Yup.string().email('Please enter the right email format').required('Email Required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password have minimum eight characters, at least one letter and one number').required('Password Required'),
    rePassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Confirm password need to match your password"
      )
    }),
    // birthday: Yup.object().,
    // photo: Yup.mixed().test(1000, "File Size is too large", value => value.size <= this.FILE_SIZE) .test('fileType', "Unsupported File Format", value => this.SUPPORTED_FORMATS.includes(['image/*']) )
  });

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
        <StartBarCt openStb={this.state.openStb} closeStb={this.handleCloseStb} titleStb={this.state.message} typeNoti="error"></StartBarCt>
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
                <Formik
                  initialValues={this.initialValues}
                  validationSchema={this.SignupSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({ errors, touched }) => (<Form>
                    <Box
                      noValidate
                      sx={{ mt: 3, fontSize: FONT_SIZE.smallText }}
                    >
                      <Grid container spacing={2}>
                        {/* avatar */}
                        <Grid item xs={12} sx={this.customAvatarField}>
                          <Box>
                            <TextField
                              className="custom-select-box"
                              type="file"
                              accept="image/*"
                              onChange={this.onSelectFile}
                              id="contain-select-image"
                              multiple
                            />
                          </Box>
                          {croppedImageUrl && (
                            <Box sx={{ position: "relative" }}>
                              <IconButton
                                sx={{ position: "absolute", top: "2px", right: "7px" }}
                              >
                                <StyledCloseIcon
                                  onClick={this.clearImage}
                                  sx={{
                                    color: "#606770",
                                    background: "rgba(255,255,255,.8)",
                                    width: "25px",
                                    height: "25px",
                                  }}
                                />
                              </IconButton>
                              <img
                                value="croppedImageUrl"
                                alt="Crop"
                                name = "photo"
                                style={{ maxWidth: "100%" }}
                                src={croppedImageUrl}
                              />
                            </Box>
                          )}
                          <input
                            type="image"
                            name="avatar"
                            hidden
                            value={croppedImageUrl}
                          ></input>
                            {!this.state.isValidPhoto ? (<p className="css-1wc848c-MuiFormHelperText-root error-text" id="date-helper-text">Avatar have to be in image format and under 2MB</p>) : null}
                        </Grid>
                        {/* end-avatar */}
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoComplete="firstName"
                            helperText={<ErrorMessage className="error-text" name="firstName" />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            helperText={<ErrorMessage className="error-text" name="lastName" />}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            helperText={<ErrorMessage className="error-text" name="email" />}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            required
                            fullWidth
                            name="password"
                            label="Enter Password"
                            type={this.state.showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="new-password"
                            onCut={this.handleStopChange}
                            onCopy={this.handleStopChange}
                            onPaste={this.handleStopChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => this.handleClickShowPassword("password")}
                                    onMouseDown={() => this.handleClickShowPassword("password")}
                                  >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                            helperText={<ErrorMessage className="error-text" name="password" />}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            required
                            fullWidth
                            name="rePassword"
                            label="Confirm Password"
                            type={this.state.showRePassword ? "text" : "password"}
                            id="re-password"
                            autoComplete="re-password"
                            onCut={this.handleStopChange}
                            onCopy={this.handleStopChange}
                            onPaste={this.handleStopChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => this.handleClickShowPassword("repassword")}
                                    onMouseDown={() => this.handleClickShowPassword("repassword")}
                                  >
                                    {this.state.showRePassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                            helperText={<ErrorMessage className="error-text" name="rePassword" />}
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
                            {errors.birthday && touched.birthday ? (<p className="css-1wc848c-MuiFormHelperText-root error-text" id="date-helper-text">{errors.birthday}</p>) : null}
                          </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              Gender
                            </FormLabel>
                            <Field
                              as={RadioGroup}
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
                            </Field>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Stack alignItems="flex-start" sx={{ mt: 3 }}>
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
                  </Form>)}
                </Formik>
              </Box>
            </Container>
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default SignUp;
