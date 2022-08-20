import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BORDER_RADIUS, BOX_SHADOW, FONT_SIZE, GRP_COLOR } from "../../constant/css_constant";
import { registerConfirm } from "../../features/auth";
import Loading from "../common/base/loading/Loading";

export default function RegisterConfirm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { token } = useParams();

  useEffect(() => {
    dispatch(registerConfirm({ confirmation_token: token }))
    .unwrap()
    .then((data) => {
      if (data.success) {
        setLoading(false);
      }
    })
    .catch((error) => {
        alert("This link is inactive status");
        setTimeout(() => {
          navigate("/register");
        }, 5000);
    })
  }, [dispatch]);

  const button_style = {
    mt: 3, mb: 2,
    bgcolor: GRP_COLOR.BACKGROUND01,
    borderRadius: BORDER_RADIUS.br10,
    boxShadow: BOX_SHADOW.CODE001,
    height: "45px",
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {
        loading ?
          <Loading show={loading}/> :
          <>
            <Typography
              component="h1"
            >
              Register
            </Typography>
            <br></br><br></br>
            <Typography component="h3" color="green">
              Congratulations, your account have been successfully created.
            </Typography>
            <Button
              type="submit"
              variant="contained"
              sx={button_style}
              href="/users/login"
            >
              <span className="text-white">Continue</span>
            </Button>
          </>
      }
    </Box>
  )
}