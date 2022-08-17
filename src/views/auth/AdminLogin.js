import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth";
import { clearMessage } from "../../features/message";
import {
  GRP_COLOR,
  FONT_SIZE,
  LINE_HEIGHT,
  FONT_WEIGHT,
  BORDER_RADIUS,
  BOX_SHADOW,
} from "../../constant/css_constant";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../styles/login.scss";
import bgNew from "../auth/img/conv.png";
import { Fade, Slide, Stack, Zoom } from "@mui/material";
import StartBarCt from "../common/error/StackBarCt";
export default function AdminLogin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword , setShowPassword] = useState(false)
  const [openStb, setOpenStb] = useState(false)
  const { message } = useSelector((state) => state.message);
  const containerRef = React.useRef(null);

  const initialValues = {
    email: "",
    password: "",
    // remember: false,
  };

  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter the right email format').required('Email Required'),
    password: Yup.string().required('Password Required'),
  });

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleStopChange = (e) => {
    e.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleOpenStb = () => {
    setOpenStb(true)
  }
  const handleCloseStb = () => {
    setOpenStb(false)
  }

  const handleSubmit = (value) => {
    setIsSubmit(true);

    dispatch(
      login({
        user: { email: value.email, password: value.password },
      })
    )
      .unwrap()
      .then((data) => {
        if (data.success) {
          navigate("/admin");
        }
      })
      .catch(() => {
        handleOpenStb();
        setIsSubmit(false);
        setLoading(false);
      });
  };

  const typeButton = {
    mt: 3,
    mb: 2,
    bgcolor: GRP_COLOR.BACKGROUND01,
    color: GRP_COLOR.CODE016,
    "&:hover": {
      color: GRP_COLOR.WHITECODE,
    },
    borderRadius: BORDER_RADIUS.br10,
    boxShadow: BOX_SHADOW.CODE001,
    height: "45px",
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <StartBarCt openStb={openStb} closeStb={handleCloseStb} titleStb={message} typeNoti="error"></StartBarCt>
      <Grid
        container
        spacing={0}
        sx={{
          position : "relative",
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
        columns={{ xs: 1, sm: 2, md: 2 }}
      >
       
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            fontWeight: FONT_WEIGHT.normal,
            lineHeight: LINE_HEIGHT.normal,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={isSubmit ? "opacity-background" : ""}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              fontSize={FONT_SIZE.formHeader}
            >
              Sign in
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              fontSize={FONT_SIZE.formNormalText}
            >
              Sign in and start finding your friends!
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (<Form>
                <Box
                  sx={{ mt: 1, fontSize: FONT_SIZE.smallText }}
                >
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
                  <Field
                    as={TextField}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    onCut={handleStopChange}
                    onCopy={handleStopChange}
                    onPaste={handleStopChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    helperText={<ErrorMessage className="error-text" name="password" />}

                  />
                  {/* <FormControlLabel
                    sx={{
                      mt: "10px",
                      lineHeight: LINE_HEIGHT.lh17,
                      fontWeight: FONT_WEIGHT.middle,
                    }}
                    control={<Checkbox value="remember" />}
                    label="Remember me"
                  /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmit}
                    sx={{ marginTop: "10px", boxShadow: "none" }}
                  >
                    Sign In  { isSubmit ? <div className="items-center"><div className="lds-login-ring"></div></div>: <></> }
                  </Button>
                  <Grid container sx={{ margin: "20px 0" }}>
                    <Grid item xs>
                      <Link
                        href="/users/forgot-password"
                        variant="body2"
                        sx={{
                          lineHeight: LINE_HEIGHT.lh17,
                          fontWeight: FONT_WEIGHT.middle,
                          textDecoration: "none",
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>)}
            </Formik>
          </Box>
        </Container>
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
          <Box sx={{ width: "100%", padding: 5 }} ref={containerRef}>
            <Slide
              direction="left"
              in={true}
              timeout={700}
              container={containerRef.current}
            >
              <Box ref={containerRef}>
                <Fade in={true} timeout={1000} container={containerRef.current}>
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
            <Fade in={true} timeout={1000} container={containerRef.current}>
              <Typography color="#fff">
                Create an account to join the community and finding your
                friends!
              </Typography>
            </Fade>
          </Box>
          <Fade in={true} timeout={1000} container={containerRef.current}>
            <Box ref={containerRef}>
              <Zoom in={true} container={containerRef.current} timeout={700}>
                <img src={`${bgNew}`} alt="registCover" width="100%" />
              </Zoom>
            </Box>
          </Fade>
        </Stack>
      </Grid>
    </Box>
  );
}
