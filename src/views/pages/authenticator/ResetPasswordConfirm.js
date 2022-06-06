import { Box, Button, Typography } from "@mui/material";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPwdEmailConfirm } from "../../../features/auth";
import { GRP_COLOR, BORDER_RADIUS, BOX_SHADOW } from "../../../constant/css_constant"

export default function ResetPasswordConfirm() {

    const dispatch = useDispatch()
    const { token } = useParams();


    useEffect(() => {
        dispatch(resetPwdEmailConfirm({confirmation_token: token }));
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
            <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
        <br></br><br></br>
          <Typography component="h3" color="green">
          Congratulations, your account have been change password. 
          </Typography>
          <Button
          type="submit"
          variant="contained"
          sx={button_style}
          href="/users/login"
           >
              Cotinue
          </Button>
        </Box>
    )
}