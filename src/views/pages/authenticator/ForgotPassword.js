import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { clearMessage } from "../../../features/message"
import { useDispatch, useSelector } from "react-redux";
import { BORDER_RADIUS, BOX_SHADOW, FONT_SIZE, FONT_WEIGHT, GRP_COLOR, LINE_HEIGHT } from "../../../constant/css_constant";
import { sendMailResetPass } from "../../../features/auth";


export default function ForgotPassword() {
    const dispatch = useDispatch()
    const { message } = useSelector((state) => state.message);
    useEffect(() => {
        dispatch(clearMessage());
      }, [dispatch]);

    const typeButton = {
        mt: 5,
        mb: 2,
        bgcolor: GRP_COLOR.BACKGROUND01,
        color: GRP_COLOR.CODE016,
        '&:hover': {
            color: GRP_COLOR.WHITECODE,
        },
        borderRadius: BORDER_RADIUS.br10,
        boxShadow: BOX_SHADOW.CODE001,
        height: "45px",
    }

    const sxAlignItem = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    const redirectToResetForm = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get("email"));
        dispatch(sendMailResetPass(
            {
                user: { email: data.get("email") }
            }
        ))
            .unwrap()
            .then(() => {
                console.log("then");
                //   if(isLoggedIn) {
                //     navigate("/chat-main-screen");
                //     window.location.reload();
                //   } 
            })
            .catch(() => {
                console.log("catch");
            });
    }

    return (

        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* this component to enter email and link to reset pass */}
            <Container component="main" maxWidth="xs" sx={{ fontWeight: FONT_WEIGHT.normal, lineHeight: LINE_HEIGHT.normal }}>
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
                    <Typography
                        fontSize={FONT_SIZE.formHeaderSmall}
                    >
                        Forgot Password?
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h5"
                        fontSize={FONT_SIZE.formNormalText}
                    >
                        No worries, we'll send you reset instructions
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={redirectToResetForm}
                        noValidate
                        sx={{ mt: 7, fontSize: FONT_SIZE.smallText, width: "500px" }}
                    >
                        <TextField
                            sx={{
                                bgcolor: GRP_COLOR.CODE016,
                                borderRadius: BORDER_RADIUS.normal,
                                color: GRP_COLOR.WHITECODE,
                            }}
                            margin="normal"
                            variant="filled"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            InputLabelProps={{
                                style: {
                                    color: GRP_COLOR.WHITECODE,
                                },
                            }}
                            InputProps={{
                                style: {
                                    color: GRP_COLOR.WHITECODE,
                                },
                            }}
                        />
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
                            sx={typeButton}
                        >
                            Reset password
                        </Button>
                        <Grid container sx={sxAlignItem}>
                            <Grid item >
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
                    </Box>
                </Box>

            </Container>
            <Box className="login-main"></Box>
        </Box>
    )
}