import { Box, Stack, Typography } from '@mui/material';
import React from 'react'

export default function ResetPwdEmailConfirmSuccess() {
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
           We have send you email to reset your password. Please check it!
         </Typography>
       </Stack>
     </Box>
     <Box className="login-main"></Box>
   </Box>
 );
}
