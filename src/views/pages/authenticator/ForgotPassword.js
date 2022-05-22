import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function ForgotPassword() {
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
            Forgot your password?
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#637381" }}>
            Please enter the email address associated with your account, and
            we'll email you a link to reset your password.
          </Typography>
        </Stack>
        <Stack direction="column" spacing={3}>
          <TextField
            id="outlined-password-input"
            label="Email address"
            type="text"
          />
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ fontWeight: "bold" }}
          >
            Reset Password
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
