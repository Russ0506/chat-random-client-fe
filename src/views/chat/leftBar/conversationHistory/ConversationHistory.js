import {
  Box,
  Drawer,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles, styled } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import { RandomChatSideBarItem } from "../../../../constant/RandomChatSideBarItem";
import ChatInfoLayer from "../components/ChatInfoLayer";
import FilterChatBoxLayer from "../components/FilterChatBoxLayer";
import TopSideBar from "../components/TopSideBar";
import { DRAWER_WITH } from "../../../../constant/css_constant";
import { allConversationHistory } from "../../../../constant/conversasionHistory";
import SearchIcon from "@mui/icons-material/Search";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  color: alpha(theme.palette.common.black, 0.5),
  "& .Mui-focused": {
    color: alpha(theme.palette.common.black, 1),
    // backgroundColor: alpha(theme.palette.common.black, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& input::placeholder": {
    color: "gray",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function ConversationHistory() {
  const useStyles = makeStyles({
    drawerPaper: {
      paddingTop: "10px",
    },
  });

  const classes = useStyles();

  const drawer = (
    <Box>
      {/* <Toolbar /> */}

      {/* {RandomChatSideBarItem.map((component, i) => ( */}
      {/* <ListItem>
            {
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {component.name}
              </Typography>
            }
          </ListItem> */}
      <Search>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: "gray" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <List>
        {allConversationHistory.map((item, k) => (
          <ListItem key={k} disablePadding>
            <ListItemButton>
              <ChatInfoLayer data={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* ))} */}
    </Box>
  );

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DRAWER_WITH,
        },
      }}
      open
    >
      {drawer}
    </Drawer>
    /* <h1>group chat layer</h1>
      <ChatInfoLayer />
      <FilterChatBoxLayer /> */
  );
}
