import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { useDispatch, useSelector } from "react-redux"
import { login } from '../../../features/auth'
import { clearMessage, setMessage } from "../../../features/message"
import { GRP_COLOR, FONT_SIZE, LINE_HEIGHT, FONT_WEIGHT, BORDER_RADIUS, BOX_SHADOW } from "../../../constant/css_constant"
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import "../../../styles/login.scss"
import Loading from "../../common/base/loading/Loading";

export default function SignIn(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const initialValues = {
    username: '',
    password: '',
    remember: false
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().email('please enter valid email').required("Required"),
    password: Yup.string().required("Required").matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Your password must contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  })

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true)
    const data = new FormData(event.currentTarget);

    dispatch(login(
      {
        user: { email: data.get("email"), password: data.get("password") }
      }
    ))
      .unwrap()
      .then((data) => {
        if(data.success) {
          navigate("/chat-main-screen");
        } 
      })
      .catch(() => {
        setIsSubmit(false)
        setLoading(false);
      });

  };

  const typeButton = {
    mt: 3,
    mb: 2,
    bgcolor: GRP_COLOR.BACKGROUND01,
    color: GRP_COLOR.CODE016,
    '&:hover': {
      color: GRP_COLOR.WHITECODE,
    },
    borderRadius: BORDER_RADIUS.br10,
    boxShadow: BOX_SHADOW.CODE001,
    height: "45px",
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <Loading show={isSubmit}></Loading>
      <Container component="main" maxWidth="xs" sx={{ fontWeight: FONT_WEIGHT.normal, lineHeight: LINE_HEIGHT.normal }} className={isSubmit? "opacity-background" : ""}>
        <CssBaseline />
        <Box
          sx={{
            paddingTop: "100px",
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, fontSize: FONT_SIZE.smallText }}
          >
            <TextField
              sx={{
                bgcolor: GRP_COLOR.CODE016,
                borderRadius: BORDER_RADIUS.normal,
                color: GRP_COLOR.WHITECODE,
              }}
              margin="normal"
              variant="filled"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{
                style: {
                  color: GRP_COLOR.WHITECODE,
                },
              }}
              InputProps={{
                style: {
                  color: GRP_COLOR.WHITECODE,
                },
              }}
            />
            <TextField
              sx={{
                bgcolor: GRP_COLOR.CODE016,
                borderRadius: BORDER_RADIUS.normal,
                color: GRP_COLOR.WHITECODE,
              }}
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{
                style: {
                  color: GRP_COLOR.WHITECODE,
                },
              }}
              InputProps={{
                style: {
                  color: GRP_COLOR.WHITECODE,
                },
              }}
            />
            <FormControlLabel
              sx={{
                lineHeight: LINE_HEIGHT.lh17,
                fontWeight: FONT_WEIGHT.middle,
              }}
              control={
                <Checkbox
                  value="remember"
                />
              }
              label="Remember me"
            />
            {
              message ? 
              <Box
                component="div"
                variant="h5"
                color="red"
                fontSize={FONT_SIZE.smallText}
              >
                {message}
              </Box> : ''}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={typeButton}
              disabled = {isSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="/users/forgotPassword"
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
              <Grid item>
                <Link
                  href="/register"
                  variant="body2"
                  sx={{
                    lineHeight: LINE_HEIGHT.lh17,
                    fontWeight: FONT_WEIGHT.middle,
                    textDecoration: "none",
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
      <Box className="login-main"></Box>
    </Box>
  );
}
