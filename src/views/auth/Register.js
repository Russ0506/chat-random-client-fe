import React from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { GRP_COLOR, BORDER_RADIUS, BOX_SHADOW, FONT_SIZE } from "../../constant/css_constant"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Loading from "../common/base/loading/Loading";
import Select from "react-select";
import { axiosClient, axiosMultipartForm } from '../../setup/axiosClient'
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const URL = "users";

class SignUp extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9
      },
      open: false,
      selectedDate: new Date(),
      isSubmit: false,
      message: '',
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

    this.handleOpen()
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
      const reader = new FileReader()
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            this.dataURLtoFile(reader.result, 'cropped.jpg')
          }
        },
        'image/jpeg',
        1
      );
    });
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
            
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, {type:mime});
    this.setState({croppedImage: croppedImage }) 
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isSubmit: "true"
    })
    const data = new FormData(event.currentTarget);

    data.append("image", this.state.croppedImage, "imagename");
    const params = {
      user: {
        first_name: data.get("firstName"), last_name: data.get("lastName"),
        birthday: this.state.selectedDate, email: data.get("email"), password: data.get("password"),
        gender: data.get("gender"), time_zone: data.get("time_zone"), avatar: data.get("image")
      }
    };

    const formData = new FormData();
    for (let param in params['user']) {
      formData.append(`user[${param}]`, params['user'][param])
    }

    axiosMultipartForm.post(`${URL}`, formData).then((data) => {
      if (data.success) {
        // this function still not convert to class
        // this.props.navigation.navigate("email-success");
      }
    })
      .catch(() => {
        this.setState({ isSubmit: false })
      });
  }

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });
  handleDateChange(date) {
    console.log(date);
    this.setState({ selectedDate: date });
  }

  signup_button_style = {
    mt: 3, mb: 2,
    bgcolor: GRP_COLOR.BACKGROUND01,
    borderRadius: BORDER_RADIUS.br10,
    boxShadow: BOX_SHADOW.CODE001,
    height: "45px",
  }

  style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  componentDidMount() {
    axiosClient.get(`time_zones.json`).then((data) => {
      this.setState(
        { options: data.time_zones.map(it => ({ value: it, label: it })) }
      );
    });
  }

  render() {
    const { crop, croppedImageUrl, src, croppedImage } = this.state;

    return (
      <Box sx={{ overflow: "scroll", bgcolor: GRP_COLOR.WHITECODE, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Loading show={this.state.isSubmit}></Loading>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={this.style}>
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            )}
            <Button sx={{float: "right", pt: 4}} onClick={this.handleClose}>OK</Button>
          </Box>
        </Modal>
        <Container component="main" maxWidth="xs" className={this.state.isSubmit ? "opacity-background" : ""}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
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
                <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    name='re-password'
                    label="Confirm Password"
                    type="password"
                    id="re-password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} >

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Birthday"
                      value={this.state.selectedDate}
                      minDate={new Date('1920-01-01')}
                      maxDate={new Date()}
                      onChange={this.handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                      id="birthday"
                      name="birthday"
                    />

                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} >
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="gender"
                      id="gender"
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12} >
                  <FormControl>
                    <FormLabel>Time zome</FormLabel>
                    <Select options={this.state.options} name="time_zone" />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Box pb={3}>
                    <TextField type="file" accept="image/*" onChange={this.onSelectFile} multiple />
                  </Box>
                  {croppedImageUrl && (
                    <img value="croppedImageUrl" alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
                  )}
                  <input type="image" name="avatar" hidden value={croppedImageUrl}></input>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              {
                this.state.message ?
                  <Box
                    component="div"
                    variant="h5"
                    color="red"
                    fontSize={FONT_SIZE.smallText}
                  >
                    {this.state.message}
                  </Box> : ''}
              <Button

                type="submit"
                fullWidth
                variant="contained"
                sx={this.signup_button_style}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/users/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    )
  };
}

export default SignUp;