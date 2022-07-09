import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import NewPosterLayout from "./components/NewPosterLayout";
// import $ from "jquery";
import { Link } from "react-router-dom";

const shapeStyles = {
  bgcolor: "primary.main",
  width: { xs: 80, md: 120 },
  height: { xs: 80, md: 120 },
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
  minWidth: "250px",
}));

export default function UserProfile() {
  
  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          backgroundColor: "#fff",
          p: 1,
        }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          padding={{ xs: 0, sm: 1.5, md: 2 }}
          flexWrap="nowrap"
          sx={{ width: "100%"}}
        >
          <Badge>{circle}</Badge>
          <Box sx={{ml: 2 }}>
            <Stack flexDirection={{ xs: "column", md: "row" }}>
              <Typography variant="h5">Tuong Vy Bui Anh</Typography>
              <Button
                component={Link}
                to={"/users/profile/edit"}
                variant="outlined"
                sx={{ ml: 1, mb: 1, maxWidth: 180 }}
                size="small"
              >
                Edit profile
              </Button>
            </Stack>
            <Stack
              flexDirection="column"
              flexWrap="wrap"
              display={{ xs: "none", md: "flex" }}
              sx={{ mt: 2 }}
            >
              <Typography variant="body1">Gender: Male</Typography>
              <Typography variant="body1">Hobies: Tinder</Typography>
              <Typography variant="body1">
                Location: Cam Le, Danang, Viet Nam
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Divider
          variant="middle"
          sx={{ width: "100%", mt: 5, mb: 3, ml: 0, mr: 0 }}
        />
        <Grid
          container
          component={Container}
          spacing={{ xs: 2, sm: 2, md: 3 }}
          wrap="wrap"
          alignItems="center"
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Grid item>
            <NewPosterLayout />
          </Grid>
          <Grid item>
            <Item>2</Item>
          </Grid>
          <Grid item>
            <Item>3</Item>
          </Grid>
          <Grid item>
            <Item>4</Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
