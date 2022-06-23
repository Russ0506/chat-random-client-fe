import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link"
import { useDispatch, useSelector } from "react-redux";
import { resetPwd } from "../../../features/auth";
import { clearMessage } from "../../../features/message";
import { FONT_SIZE } from "../../../constant/css_constant";

export default function ResetPassword(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { token } = useParams();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    dispatch(
      resetPwd({
        user: {
          reset_password_token: token,
          password: data.get("newPassword"),
          password_confirmation: data.get("confirmNewPassword"),
        },
      })
    )
      .unwrap()
      .then((data) => {
        console.log(data);
        // props.history.push("/profile");
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
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
        component="form"
        onSubmit={handleSubmit}
        // noValidate
        sx={{
          width: "50%",
          minWidth: "365px",
          maxWidth: "480px",
        }}
      >
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
        <Stack direction="column" spacing={3}>
          {/* <TextField
            id="pwd-request-token"
            label="Request OTP"
            name="resetPasswordToken"
            type="text"
            required
            autoComplete="current-OTP"
          /> */}
          <TextField
            id="new-password"
            label="New password"
            name="newPassword"
            type="password"
            required
            autoComplete="current-new-password"
          />
          <TextField
            id="confirm-new-password"
            label="Confirm new password"
            name="confirmNewPassword"
            type="password"
            required
            autoComplete="current-confirm-new-password"
          />
        </Stack>
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
        <Stack direction="column" sx={{ mt: 5 }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            sx={{ fontWeight: "bold" }}
          >
            Update Password
          </Button>
        </Stack>
        <Stack direction="column" sx={{ mt: 1.5 }}>
          <Button color="success" size="large" sx={{ fontWeight: "bold" }}>
            <Link href="/users/login" sx={{ textDecoration: "none" }}>
              Back to login
            </Link>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
