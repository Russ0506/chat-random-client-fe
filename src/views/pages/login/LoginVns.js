import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
});

export default function ForgotPassword() {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
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
        <Stack direction="column" spacing={0} sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Forgot your password?
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
            Please enter the email address associated with your account, and
            we'll email you a link to reset your password.
          </Typography>
        </Stack>
        <Stack direction="column" spacing={2}>
          <TextField
            id="outlined-password-input"
            label="Email address"
            type="text"
          />
          <Button variant="contained" color="success">
            Reset Password
          </Button>
          <Button color="success">Back</Button>
        </Stack>
      </Box>
    </Box>
  );
}
