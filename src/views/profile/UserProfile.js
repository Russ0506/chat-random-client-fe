import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import NewPosterLayout from "./components/NewPosterLayout";

const shapeStyles = {
  bgcolor: "primary.main",
  width: 150,
  height: 150,
  marginTop: 1,
};
const shapeCircleStyles = { borderRadius: "50%" };
const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);

const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "300px",
  boxShadow: "none",
  backgroundColor: "gray",
  minWidth: "250px"
}));

export default function UserProfile() {
  return (
    <Stack alignItems="center" sx={{ width: "100%", mt: 5 }}>
      <Box
        sx={{
          width: "45%",
          maxWidth: "1000px",
          minWidth: "320px",
        }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          sx={{
            width: "100%",
          }}
        >
          <Badge>{circle}</Badge>
          <Box sx={{ ml: 10 }}>
            <Typography variant="h4">
              Ahihi do ngoc{" "}
              <Button variant="outlined" size="small" sx={{ ml: 1, mb: 1 }}>
                Edit profile
              </Button>
            </Typography>
            <Stack flexDirection="column" flexWrap="wrap" sx={{ mt: 2 }}>
              <Typography variant="body1">Gender: Male</Typography>
              <Typography variant="body1">Hobies: Tinder</Typography>
              <Typography variant="body1">
                Location: Cam Le, Danang, Viet Nam
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Divider variant="middle" sx={{ width: "100%", mt: 5, mb:2, ml:0, mr:0 }} />
        <Grid sx={{width: "100%"}} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <NewPosterLayout />
          </Grid>
          <Grid item xs={4}>
            <Item>2</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>3</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>4</Item>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}
