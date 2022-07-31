import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { clearMessage } from "../../features/message";
import { useDispatch, useSelector } from "react-redux";
import {
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from "../../constant/css_constant";
import { sendMailResetPass } from "../../features/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../common/base/loading/Loading";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import StartBarCt from "../common/error/StackBarCt";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [openStb, setOpenStb] = useState(false)

  const { message } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
  };

  const onSubmit = (values, props) => {
    setIsSubmit(true);
    dispatch(
      sendMailResetPass({
        user: { email: values.email },
      })
    )
      .unwrap()
      .then(() => {
        navigate("/reset-password-email-confirm/success");
      })
      .catch(() => {
        setIsSubmit(false);
        setOpenStb(true)
      });
  };

  const handleCloseStb = () => {
    setOpenStb(false)
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter the right email format").required("Email Required"),
  });

  const sxAlignItem = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mt: 1.5,
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
      <StartBarCt
        openStb={openStb}
        closeStb={handleCloseStb}
        titleStb={message}
        typeNoti="error"
      ></StartBarCt>
      <Loading show={isSubmit}></Loading>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          fontWeight: FONT_WEIGHT.normal,
          lineHeight: LINE_HEIGHT.normal,
        }}
        className={isSubmit ? "opacity-background" : ""}
      >
        <CssBaseline />
        <Box
          sx={{
            mt: 7,
            paddingTop: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography fontSize={FONT_SIZE.formHeaderSmall}>
            Forgot Password?
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            fontSize={FONT_SIZE.formNormalText}
          >
            No worries, we'll send you reset instructions
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={
                    <ErrorMessage className="error-text" name="email" />
                  }
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmit}
                  sx={{ mt: 1.5 }}
                >
                  Reset password
                </Button>
                <Grid container sx={sxAlignItem}>
                  <Grid item>
                    <Link
                      href="/users/login"
                      variant="body2"
                      sx={{
                        lineHeight: LINE_HEIGHT.lh17,
                        fontWeight: FONT_WEIGHT.middle,
                        textDecoration: "none",
                      }}
                    >
                      Back to login
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
      <Box className="login-main"></Box>
    </Box>
  );
}
