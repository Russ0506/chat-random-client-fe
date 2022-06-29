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
} from "@mui/material";
import React from "react";

export default function PartnerPoster() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const Item = styled(Paper)(({ theme }) => ({
    //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "180px",
    boxShadow: "none",
    backgroundColor: "gray",
    cursor: "pointer",
  }));
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
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ maxHeight: 400, overflow: "auto" }}
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
                <Item>2</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>3</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>4</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>5</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>6</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>7</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>8</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>9</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>10</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>11</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>12</Item>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
