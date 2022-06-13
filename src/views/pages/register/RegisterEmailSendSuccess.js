import { Box, Stack, Typography } from '@mui/material';
import React from 'react'

export default function RegisterEmailSendSuccess() {
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
           Please check your email...
         </Typography>
         <Typography variant="subtitle1" sx={{ color: "#637381" }}>
           We have send you email to confirm your new account, you have to confirm it before login
         </Typography>
       </Stack>
     </Box>
     <Box className="login-main"></Box>
   </Box>
 );
}
