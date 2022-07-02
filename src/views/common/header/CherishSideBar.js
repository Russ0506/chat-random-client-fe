import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Homepage from "../../Homepage";
import Iconify from "../base/icon/Iconify";

const icoList = {
  home: {
    notChosen: "ci:home-heart",
    chosen: "ci:home-heart-1",
  },
  chat: {
    notChosen: "bi:chat-heart",
    chosen: "bi:chat-heart-fill",
  },
  newPost: {
    notChosen: "ant-design:plus-square-outlined",
    chosen: "ant-design:plus-square-filled",
  },
};
export default function CherishSideBar() {
  return (
    <Stack flexDirection="row">
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          width: "60px",
          p: "38px",
          borderRight: "1px solid #e5e0e0",
        }}
      >
        <Iconify
          icon={icoList.home.notChosen}
          style={{ width: "35px", height: "35px", margin: "5px 0" }}
        />
        <Iconify
          icon={icoList.chat.notChosen}
          style={{ width: "28px", height: "28px", margin: "10px 0" }}
        />
        <Iconify
          icon={icoList.newPost.notChosen}
          style={{ width: "30px", height: "30px", margin: "7px 0" }}
        />
      </Stack>
      <Box sx={{ width: "calc(100vw - 60px)", height: "100vh" }}>
        <Homepage />
      </Box>
    </Stack>
  );
}
