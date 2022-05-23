import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function ChangePassword() {
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
            Change Password
          </Typography>
          {/* <Typography variant="subtitle1" sx={{ color: "#637381" }}>
            Please enter your new password
          </Typography> */}
        </Stack>
        <Stack direction="column" spacing={3}>
          <TextField
            id="outlined-password-input"
            label="New password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            id="outlined-password-input"
            label="Confirm new password"
            type="password"
            autoComplete="current-password"
          />
        </Stack>
        <Stack direction="column" sx={{ mt: 5 }}>
          <Button
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
