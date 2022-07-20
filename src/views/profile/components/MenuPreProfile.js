import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import { DRAWER_WITH_EDIT_PRF } from "../../../constant/css_constant";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";
import EditProfile from "../EditProfile";
import ChangePwd from "../ChangePwd";
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
            borderRadius: "10px",
            overflow: "hidden",
            maxWidth: "1200px",
          }}
        >
          <Stack
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{
              width: DRAWER_WITH_EDIT_PRF,
              borderRight: "1px solid #e5e0e0",
              padding: "15px 0",
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
                          k == this.state.index ? "3px solid black" : "",
                        fontWeight: k == this.state.index ? "bold" : "",
                        color: k == this.state.index ? "#817cce" : "",
                      }}
                    >
                      <MenuLayer>{item.name}</MenuLayer>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Stack>
          <Box
            sx={{
              width: `calc(100% - ${DRAWER_WITH_EDIT_PRF}px)`,
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
    name: "Profile",
    link: "/users/profile/edit",
    component: <EditProfile />,
  },
  {
    name: "Change password",
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
