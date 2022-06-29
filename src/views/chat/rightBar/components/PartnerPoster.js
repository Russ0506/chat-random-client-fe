import styled from "@emotion/styled";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import StarBorder from "@mui/icons-material/StarBorder";
import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ModalPoster from "./ModalPoster";

export default function PartnerPoster() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper", height: "100%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      //   subheader={
      //     <ListSubheader component="div" id="nested-list-subheader">
      //       Nested List Items
      //     </ListSubheader>
      //   }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="h5" sx={{ fontWeight: 700, ml: -2.5 }}>
              Poster
            </Typography>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{
          maxHeight: window.innerHeight / 2.2,
          overflow: "auto",
          minHeight: 300,
        }}
      >
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <Grid
              sx={{ width: "100%", overflow: "auto" }}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}
            >
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
              <Grid item xs={4}>
                <ModalPoster />
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
