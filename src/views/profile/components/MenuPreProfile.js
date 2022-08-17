import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import {
  DRAWER_WITH_EDIT_PRF,
  DRAWER_WITH_EDIT_PRF_MB,
} from "../../../constant/css_constant";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";
import EditProfile from "../EditProfile";
import ChangePwd from "../ChangePwd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LockResetIcon from "@mui/icons-material/LockReset";
export default class MenuPreProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index == null ? 0 : this.props.index,
    };
  }

  handleClick = (indexProp) => {
    this.setState({
      ...this.state,
      index: indexProp,
    });
  };

  render() {
    return (
      <Stack
        flexDirection="row"
        justifyContent="center"
        sx={{
          /* background: "rgb(236, 236, 250)", */ height: "100%",
          width: "100%",
          // background: "rgb(247,247,253)",
          transition: "all 0.2s ease",
          // background:
          //   this.state.index === 0
          //     ? "linear-gradient(145deg, rgba(242,242,252,1) 50%, rgba(225,220,253,1) 100%)"
          //     : "linear-gradient(-145deg, rgba(242,242,252,1) 50%, rgba(225,220,253,1) 100%)",
        }}
        // sx={{height: "100%", width: "100%" }}
      >
        <Grid
          container
          // columns={{ xs: 1, sm: 2, md: 2 }}
          sx={{
            margin: "2% 2%",
            background: "#fff",
            width: "100%",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "1200px",
          }}
        >
          <Stack
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{
              width: { xs: DRAWER_WITH_EDIT_PRF_MB, md: DRAWER_WITH_EDIT_PRF },
              borderRight: "1px solid #e5e0e0",
              padding: "15px 0",
              background: "#fff",
            }}
          >
            <Stack flexDirection="column" sx={{ width: "100%" }}>
              <List>
                {menuList.map((item, k) => (
                  <ListItem key={k} disablePadding fullWidth>
                    <ListItemButton
                      onClick={() => this.handleClick(k)}
                      fullWidth
                      sx={{
                        borderLeft:
                          k === this.state.index ? "3px solid black" : "",
                        fontWeight: k === this.state.index ? "bold" : "",
                        color: k === this.state.index ? "#817cce" : "",
                      }}
                    >
                      <MenuLayer display="flex" flexDirection="row" justifyContent="flex-start !important" alignItems="center">
                        <Typography
                          sx={{
                            position: "relative",
                            right: { xs: "15px", md: "0" },
                            display: "inline",
                            width: "fit-content",
                          }}
                        >
                          {item.icon}
                        </Typography>
                        <Typography
                          display={{
                            xs: "none",
                            md: "inline",
                          }}
                          sx={{width:"fix-content", pl: 1}}
                        >
                          {item.name}
                        </Typography>
                      </MenuLayer>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Stack>
          <Box
            sx={{
              width: {
                xs: `calc(100% - ${DRAWER_WITH_EDIT_PRF_MB}px)`,
                md: `calc(100% - ${DRAWER_WITH_EDIT_PRF}px)`,
              },
              height: "100%",
              overflow: "auto",
            }}
          >
            {/* <Box sx={{ width: `calc(100% - ${DRAWER_WITH_EDIT_PRF}px)`, pl: 20, pr: 20, pt: 10, pb:10, background: "rgb(236, 236, 250)" }}> */}
            {menuList[this.state.index].component}
          </Box>
        </Grid>
      </Stack>
    );
  }
}

const menuList = [
  {
    name: "Edit Profile",
    icon: <ManageAccountsIcon sx={{ height: "32px", width: "32px" }} />,
    link: "/users/profile/edit",
    component: <EditProfile />,
  },
  {
    name: "Change password",
    icon: <LockResetIcon sx={{ height: "32px", width: "32px" }} />,
    link: "/users/profile/change-password",
    component: <ChangePwd />,
  },
];

const MenuLayer = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "45px",
  padding: theme.spacing(1),
  justifyContent: "center",
}));
