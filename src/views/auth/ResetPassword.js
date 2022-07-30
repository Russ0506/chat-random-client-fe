import { Box, Button, Stack, TextField, Typography, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Link from "@mui/material/Link"
import StartBarCt from "../common/error/StackBarCt";
import StyledCloseIcon from "../common/base/style-icon/StyledCloseIcon";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { resetPwd } from "../../features/auth";
import { clearMessage, setMessage } from "../../features/message";
import { FONT_SIZE } from "../../constant/css_constant";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ResetPassword(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openStb, setOpenStb] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false)
  const { message } = useSelector((state) => state.message);
  const { token } = useParams();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (event) => {
    setLoading(true)
    dispatch(
      resetPwd({
        user: {
          reset_password_token: token,
          password: event.password,
          password_confirmation: event.rePassword,
        },
      })
    )
      .unwrap()
      .then((data) => {
        handleOpenStb();
        if (data.success) {
          navigate("/confirm-email-reset-password");
        }
      })
      .catch(() => {
        handleOpenStb();
        setLoading(false);
      });
  };
  // error noti
  const handleOpenStb = () => {
    setOpenStb(true)
  }
  
  const handleCloseStb = () => {
    setOpenStb(false)
  }

  // yup
  const initialValues = {
    password: "",
    rePassword: "",
  };

  const ResetValidationSchema = Yup.object().shape({
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password have minimum eight characters, at least one letter and one number').required('Password Required'),
    rePassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Confirm password need to be the same as password"
      )
    }),
  });

  const handleClickShowPassword = (type) => {
    if (type === 'password')  setShowPassword(!showPassword)
    if (type === 'repassword') setShowRePassword(!showRePassword)
  }

  const handleStopChange = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "50%",
          minWidth: "365px",
          maxWidth: "480px",
        }}
      >
        <StartBarCt openStb={openStb} closeStb={handleCloseStb} titleStb={message} typeNoti="error"></StartBarCt>
        <Stack direction="column" spacing={0.5} sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Change Password
          </Typography>
          <Typography variant="subtitle1" sx={{
            color: "#637381", display: "flex",
            justifyContent: "center",
          }}>
            Please enter your new password to reset your password.
          </Typography>
        </Stack>
        <Formik
          initialValues={initialValues}
          validationSchema={ResetValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (<Form>
            <Stack direction="column" spacing={3}>
              {/* <TextField
            id="pwd-request-token"
            label="Request OTP"
            name="resetPasswordToken"
            type="text"
            required
            autoComplete="current-OTP"
          /> */}
              <Field
                as={TextField}
                id="new-password"
                label="New password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-new-password"
                onCut={handleStopChange}
                onCopy={handleStopChange}
                onPaste={handleStopChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword("password")}
                        onMouseDown={() => handleClickShowPassword("password")}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                helperText={<ErrorMessage className="error-text" name="password" />}
              />
              <Field
                as={TextField}
                id="confirm-new-password"
                label="Confirm new password"
                name="rePassword"
                type={showRePassword ? "text" : "password"}
                autoComplete="re-password"
                onCut={handleStopChange}
                onCopy={handleStopChange}
                onPaste={handleStopChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword("repassword")}
                        onMouseDown={() => handleClickShowPassword("repassword")}
                      >
                        {showRePassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                helperText={<ErrorMessage className="error-text" name="rePassword" />}
              />
            </Stack>
            {/* {
              message ?
                <Box
                  component="div"
                  variant="h5"
                  color="red"
                  fontSize={FONT_SIZE.smallText}
                >
                  {message}
                </Box> : ''} */}
            <Stack direction="column" sx={{ mt: 5 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                disabled={loading}
                sx={{ fontWeight: "bold" }}
              >
                Update Password { loading ? <div className="items-center"><div className="lds-login-ring"></div></div>: <></> }
              </Button>
            </Stack>
            <Stack direction="column" sx={{ mt: 1.5 }}>
              <Button color="success" size="large" sx={{ fontWeight: "bold" }}>
                <Link href="/users/login" sx={{ textDecoration: "none" }}>
                  Back to login
                </Link>
              </Button>
            </Stack>
          </Form>)}
        </Formik>
      </Box>
    </Box>
  );
}
