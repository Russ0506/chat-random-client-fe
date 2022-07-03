import { Button, Stack } from "@mui/material";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import Homepage from "../../Homepage";
import Iconify from "../base/icon/Iconify";

const ButtonNav = styled(Stack)(({ theme }) => ({
  // backgroundColor: "#ececfa",
  borderRadius: "8px",
  width: "50px",
  height: "50px",
  margin: "5px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ChosenButtonNav = styled(Stack)(({ theme }) => ({
  backgroundColor: "#ececfa",
  borderRadius: "8px",
  width: "50px",
  height: "50px",
  margin: "5px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const icoList = {
  home: {
    notChosen: "ci:home-heart",
    chosen: "ci:home-heart-1",
    link: "/",
  },
  chat: {
    notChosen: "bi:chat-heart",
    chosen: "bi:chat-heart-fill",
    link: "/app",
  },
  newPost: {
    notChosen: "ant-design:plus-square-outlined",
    chosen: "ant-design:plus-square-filled",
  },
};
export default function CherishApp({index = 1, body}) {
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
        {index == 1 ? (
          <ChosenButtonNav>
            <Iconify
              icon={icoList.home.chosen}
              style={{ width: "35px", height: "35px" }}
            />
          </ChosenButtonNav>
        ) : (
          <ButtonNav>
            <Iconify
              icon={icoList.home.notChosen}
              style={{ width: "35px", height: "35px" }}
            />
          </ButtonNav>
        )}
        {index == 2 ? (
          <ChosenButtonNav>
            <Iconify
              icon={icoList.chat.chosen}
              style={{ width: "28px", height: "28px" }}
            />
          </ChosenButtonNav>
        ) : (
          <ButtonNav>
            <Iconify
              icon={icoList.chat.notChosen}
              style={{ width: "28px", height: "28px" }}
            />
          </ButtonNav>
        )}
        <ButtonNav>
          <Iconify
            icon={icoList.newPost.notChosen}
            style={{ width: "30px", height: "30px" }}
          />
        </ButtonNav>
      </Stack>
      <Box sx={{ width: "calc(100vw - 60px)", height: "100vh" }}>
        {body}
      </Box>
    </Stack>
  );
}
