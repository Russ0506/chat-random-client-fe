import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { login, user_verify } from "../../features/auth";
import { clearMessage, setMessage } from "../../features/message";
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
import Loading from "../common/base/loading/Loading";
// import { useCookies } from "react-cookie";
import bgNew from "../auth/img/conv.png";
import { Stack } from "@mui/material";
export default function SignIn(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  // const [cookies, setCookie, removeCookie] = useCookies(['_random_chat']);

  const initialValues = {
    username: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("please enter valid email")
      .required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Your password must contain at least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    const data = new FormData(event.currentTarget);

    dispatch(
      login({
        user: { email: data.get("email"), password: data.get("password") },
      })
    )
      .unwrap()
      .then((data) => {
        if (data.success) {
          navigate("/app");
        }
      })
      .catch(() => {
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
      <Loading show={isSubmit}></Loading>
      <Grid
        container
        spacing={0}
        sx={{
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, fontSize: FONT_SIZE.smallText }}
            >
              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                sx={{
                  mt: "10px",
                  lineHeight: LINE_HEIGHT.lh17,
                  fontWeight: FONT_WEIGHT.middle,
                }}
                control={<Checkbox value="remember" />}
                label="Remember me"
              />
              {message ? (
                <Box
                  component="div"
                  variant="h5"
                  color="red"
                  fontSize={FONT_SIZE.smallText}
                >
                  {message}
                </Box>
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmit}
                sx={{ marginTop: "10px", boxShadow: "none" }}
              >
                Sign In
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
                <Grid item>
                  <Stack flexDirection="row">
                    <Typography>Don't have an account?</Typography>
                    <Typography>
                      <Link
                        href="/register"
                        variant="body2"
                        sx={{
                          lineHeight: LINE_HEIGHT.lh17,
                          fontWeight: FONT_WEIGHT.middle,
                          textDecoration: "none",
                        }}
                      >
                        Sign Up
                      </Link>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Stack
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
            <Typography
              variant="h2"
              color="#fff"
              sx={{ fontWeight: 700, lineHeight: 1.1 }}
            >
              Adventure Starts Here
            </Typography>
            <Typography color="#fff">
              Create an account to join the community and finding your friends!
            </Typography>
          </Box>
          <img src={`${bgNew}`} alt="registCover" width="100%" />
        </Stack>
      </Grid>
      {/* <Box className="login-main"></Box> */}
    </Box>
  );
}
