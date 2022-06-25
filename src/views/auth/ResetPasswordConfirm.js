import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { GRP_COLOR, BORDER_RADIUS, BOX_SHADOW } from "../../constant/css_constant"

export default function ResetPasswordConfirm() {

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
          Congratulations, your account have been change password. Please login again to explore more about random chat universal.
          </Typography>
          <Button
          type="submit"
          variant="contained"
          sx={button_style}
          href="/users/login"
           >
              Continue
          </Button>
        </Box>
    )
}