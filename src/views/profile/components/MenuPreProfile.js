import { Button, List, ListItem, ListItemButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import { DRAWER_WITH } from "../../../constant/css_constant";
import { styled } from "@mui/styles";
export default class MenuPreProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.body == null ? "No data in layout" : this.props.body,
    };
  }
  render() {
    return (
      <Stack flexDirection="row">
        <Stack
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{
            width: DRAWER_WITH,
            height: "100vh",
            borderRight: "1px solid #e5e0e0",
          }}
        >
          <Stack flexDirection="column" sx={{ width: "100%"}}>
            <List>
              {menuList.map((item, k) => (
                <ListItem key={k} disablePadding fullWidth>
                  <ListItemButton fullWidth>
                    <MenuLayer selected={k === 0 ? true : false}>
                      {item}
                    </MenuLayer>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Stack>
        <Box sx={{ width: `calc(100vw - ${DRAWER_WITH}px)`, p: 1}}>
          {this.state.body}
        </Box>
      </Stack>
    );
  }
}

const menuList = ["Profile", "Change password"];

const MenuLayer = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "45px",
  padding: theme.spacing(1),
  justifyContent: "center",
}));
