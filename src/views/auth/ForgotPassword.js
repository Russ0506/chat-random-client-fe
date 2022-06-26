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
  BORDER_RADIUS,
  BOX_SHADOW,
  FONT_SIZE,
  FONT_WEIGHT,
  GRP_COLOR,
  LINE_HEIGHT,
} from "../../constant/css_constant";
import { sendMailResetPass } from "../../features/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../common/base/loading/Loading";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const { message } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
  };

  const onSubmit = (values, props) => {
    console.log(values);
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
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid Email").required("Required"),
  });

  const typeButton = {
    mt: 5,
    mb: 2,
    bgcolor: GRP_COLOR.BACKGROUND01,
    color: GRP_COLOR.WHITECODE,
    "&:hover": {
      color: GRP_COLOR.WHITECODE,
    },
    borderRadius: BORDER_RADIUS.br10,
    boxShadow: BOX_SHADOW.CODE001,
    height: "45px",
  };

  const sxAlignItem = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
      {/* this component to enter email and link to reset pass */}
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
                  autoFocus
                  helperText={<ErrorMessage name="email" />}
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
                  sx={typeButton}
                  disabled={props.isSubmitting}
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
