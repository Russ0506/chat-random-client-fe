import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPwd } from "../../../features/auth";
import { clearMessage } from "../../../features/message";

export default function ChangePassword(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
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
          reset_password_token: data.get("resetPasswordToken"),
          password: data.get("newPassword"),
          password_confirmation: data.get("confirmNewPassword"),
        },
      })
    )
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
          height: "50%",
          minWidth: "365px",
          maxWidth: "480px",
        }}
      >
        <Stack direction="column" spacing={0.5} sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Change Password
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#637381" }}>
            Please enter your OTP from gmail you have receive and then set your
            new Password
          </Typography>
        </Stack>
        <Stack direction="column" spacing={3}>
          <TextField
            id="pwd-request-token"
            label="Request OTP"
            name="resetPasswordToken"
            type="text"
            required
            autoComplete="current-OTP"
          />
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
            Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
