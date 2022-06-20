import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../../features/auth'
import { clearMessage } from "../../../features/message";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import moment from 'moment'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { GRP_COLOR, BORDER_RADIUS, BOX_SHADOW, FONT_SIZE } from "../../../constant/css_constant"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
import Loading from "../../common/base/loading/Loading";

export default function SignUp(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSubmit, setIsSubmit] = useState(false);

  const { message } = useSelector((state) => state.message);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true)
    const data = new FormData(event.currentTarget);

    const birthday = moment(date).format("DD/MM/YYYY");
    dispatch(register(
      {
        user: { first_name: data.get("firstName"), last_name: data.get("lastName"), birthday: birthday, email: data.get("email"), password: data.get("password"), gender: data.get("gender") }
      }
    ))
      .unwrap()
      .then((data) => {
        if (data.success) {
          navigate("email-success");
        }
      })
      .catch(() => {
        setIsSubmit(false)
        // setLoading(false);
      });

  }

  const signup_button_style = {
    mt: 3, mb: 2,
    bgcolor: GRP_COLOR.BACKGROUND01,
    borderRadius: BORDER_RADIUS.br10,
    boxShadow: BOX_SHADOW.CODE001,
    height: "45px",
  }

  return (
    <Box sx={{ bgcolor: GRP_COLOR.WHITECODE, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Loading show={isSubmit}></Loading>
      <Container component="main" maxWidth="xs" className={isSubmit ? "opacity-background" : ""}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Enter Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  name='re-password'
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} >

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Birthday"
                    value={date}
                    minDate={new Date('1920-01-01')}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    id="birthday"
                    name="birthday"
                  />

                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} >
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    id="gender"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
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
            <Button

              type="submit"
              fullWidth
              variant="contained"
              sx={signup_button_style}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/users/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}