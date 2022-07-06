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
import { DRAWER_WITH } from "../../../constant/css_constant";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";
export default class MenuPreProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.body == null ? "No data in layout" : this.props.body,
      index: this.props.index == null ? 0 : this.props.index,
    };
  }
  render() {
    return (
      <Stack
        flexDirection="row"
        sx={{ background: "rgb(236, 236, 250)", height: "100%", width: "100%" }}
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
          }}
        >
          <Stack
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{
              width: DRAWER_WITH,
              borderRight: "1px solid #e5e0e0",
              padding: "15px 0",
            }}
          >
            <Stack flexDirection="column" sx={{ width: "100%" }}>
              <List>
                {menuList.map((item, k) => (
                  <ListItem key={k} disablePadding fullWidth>
                    <ListItemButton
                      component={Link}
                      to={item.link}
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
          <Box sx={{ width: `calc(100% - ${DRAWER_WITH}px)` }}>
            {/* <Box sx={{ width: `calc(100% - ${DRAWER_WITH}px)`, pl: 20, pr: 20, pt: 10, pb:10, background: "rgb(236, 236, 250)" }}> */}
            {this.state.body}
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
  },
  {
    name: "Change password",
    link: "/users/profile/change-password",
  },
];

const MenuLayer = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "45px",
  padding: theme.spacing(1),
  justifyContent: "center",
}));
