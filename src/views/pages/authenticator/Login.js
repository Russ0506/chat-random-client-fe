import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../../features/auth'
import { clearMessage } from "../../../features/message";
import { GRP_COLOR, FONT_SIZE, LINE_HEIGHT, FONT_WEIGHT, BORDER_RADIUS, BOX_SHADOW } from "../../../constant/css_constant"
// import "../../../styles/login.scss"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(login(
      {
        user: { email: data.get("email"), password: data.get("password") }
      }
    ))
      .unwrap()
      .then(() => {
        props.history.push("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });

  };

  return (
    <div className="login-main" style={{ background: GRP_COLOR.CODE017, height: "100vh", color: GRP_COLOR.CODE016 }}>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ fontWeight: FONT_WEIGHT.normal, lineHeight: LINE_HEIGHT.normal }}>
          <CssBaseline />
          <Box
            sx={{
              paddingTop: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
            <Typography component="h1" variant="h5" fontSize={FONT_SIZE.formHeader} >
              Sign in
            </Typography>
            <Typography component="h1" variant="h5" fontSize={FONT_SIZE.formNormalText} >
              Sign in and start finding your friends!
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, fontSize: FONT_SIZE.smallText }}
            >
              <TextField
                sx={{ bgcolor: GRP_COLOR.CODE016, borderRadius: BORDER_RADIUS.normal, color: GRP_COLOR.WHITECODE }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  style: {
                    color: GRP_COLOR.WHITECODE
                  }
                }}
                InputProps={{
                  style: {
                    color: GRP_COLOR.WHITECODE
                  }
                }}
              />
              <TextField
                sx={{ bgcolor: GRP_COLOR.CODE016, borderRadius: BORDER_RADIUS.normal, color: GRP_COLOR.WHITECODE }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  style: {
                    color: GRP_COLOR.WHITECODE
                  }
                }}
                InputProps={{
                  style: {
                    color: GRP_COLOR.WHITECODE
                  }
                }}
              />
              <FormControlLabel
                sx={{ lineHeight: LINE_HEIGHT.lh17, fontWeight: FONT_WEIGHT.middle }}
                control={<Checkbox value="remember" style={{
                  color: GRP_COLOR.CODE016,
                }} />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: GRP_COLOR.BACKGROUND01, color: GRP_COLOR.CODE016, borderRadius: BORDER_RADIUS.br10, boxShadow: BOX_SHADOW.CODE001, height: "45px" }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" sx={{ lineHeight: LINE_HEIGHT.lh17, fontWeight: FONT_WEIGHT.middle, color: GRP_COLOR.CODE016, textDecoration: "none" }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" sx={{ lineHeight: LINE_HEIGHT.lh17, fontWeight: FONT_WEIGHT.middle, color: GRP_COLOR.CODE016, textDecoration: "none" }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
