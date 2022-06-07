import { Backdrop, Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../../features/message";
import { resetPwdEmailConfirm } from "../../../features/auth";
import AlertDialogSlide from "../../common/base/dialog/AlertDialogSlide";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResetPwdEmailConfirm(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
   const [open, setOpen] = React.useState(false);
   const handleClose = () => {
     setOpen(false);
   };
   const handleToggle = () => {
     setOpen(!open);
   };
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("email"));
    handleToggle();
    dispatch(
      resetPwdEmailConfirm({
        user: { email: data.get("email") },
      })
    )
      .unwrap()
      .then(() => {
        navigate("/reset-password-email-confirm/success");
      })
      .catch(() => {
        // setLoading(false);
        alert("false");
      });
  };
  // const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  // const { isLoggedIn } = useSelector((state) => state.auth);
  // const { message } = useSelector((state) => state.message);
  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log(data);
  //   dispatch(
  //     resetPwdEmailConfirm({
  //       user: { email: data.get("email") },
  //     })
  //   )
  //     .unwrap()
  //     .then(() => {
  //       props.history.push("/profile");
  //       window.location.reload();
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // };

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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
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
            id="email"
            required
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
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
            Send Email
          </Button>
        </Stack>
        <Stack direction="column" sx={{ mt: 1.5 }}>
          <Button color="success" size="large" sx={{ fontWeight: "bold" }}>
            Back
          </Button>
        </Stack>
      </Box>
      <Box className="login-main"></Box> */}
      </Box> 
  );
}
