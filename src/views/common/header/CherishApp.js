import { Button, Stack } from "@mui/material";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import Homepage from "../../Homepage";
import Iconify from "../base/icon/Iconify";

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
  profile: {
    notChosen : "healthicons:ui-user-profile-outline",
    chosen: "healthicons:ui-user-profile",
    link: "/users/profile"
  },
  newPost: {
    notChosen: "ant-design:plus-square-outlined",
    chosen: "ant-design:plus-square-filled",
  },
};
export default function CherishApp({ index = 1, body }) {
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
          <ChosenButtonNav component={Link} to={icoList.home.link}>
            <Iconify
              icon={icoList.home.chosen}
              style={{ width: "35px", height: "35px" }}
            />
          </ChosenButtonNav>
        ) : (
          <ButtonNav component={Link} to={icoList.home.link}>
            <Iconify
              icon={icoList.home.notChosen}
              style={{ width: "35px", height: "35px" }}
            />
          </ButtonNav>
        )}
        {index == 2 ? (
          <ChosenButtonNav component={Link} to={icoList.chat.link}>
            <Iconify
              icon={icoList.chat.chosen}
              style={{ width: "28px", height: "28px" }}
            />
          </ChosenButtonNav>
        ) : (
          <ButtonNav component={Link} to={icoList.chat.link}>
            <Iconify
              icon={icoList.chat.notChosen}
              style={{ width: "28px", height: "28px" }}
            />
          </ButtonNav>
        )}
        {index == 3 ? (
          <ChosenButtonNav component={Link} to={icoList.profile.link}>
            <Iconify
              icon={icoList.profile.chosen}
              style={{ width: "32px", height: "32px" }}
            />
          </ChosenButtonNav>
        ) : (
          <ButtonNav component={Link} to={icoList.profile.link}>
            <Iconify
              icon={icoList.profile.notChosen}
              style={{ width: "32px", height: "32px" }}
            />
          </ButtonNav>
        )}
        {index == 4 ? (
          <ChosenButtonNav>
            <Iconify
              icon={icoList.newPost.notChosen}
              style={{ width: "30px", height: "30px" }}
            />
          </ChosenButtonNav>
        ) : (
          <ButtonNav>
            <Iconify
              icon={icoList.newPost.notChosen}
              style={{ width: "28px", height: "28px" }}
            />
          </ButtonNav>
        )}
      </Stack>
      <Box sx={{ width: "calc(100vw - 60px)", height: "100vh" }}>{body}</Box>
    </Stack>
  );
}

const navBtnCmm = {
  borderRadius: "8px",
  width: "50px",
  height: "50px",
  margin: "5px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease"
};

const ButtonNav = styled(Stack)(({ theme }) => ({
  color: "#9da8b7",
  ...navBtnCmm,
  "&:active": {
    color: "#6748da",
  },
  "&:hover": {
    color: "#6748da",
  },
}));

const ChosenButtonNav = styled(Stack)(({ theme }) => ({
  backgroundColor: "#ececfa",
  color: "#6748da",
  ...navBtnCmm,
  "&:active": {
    color: "#6748da",
  },
}));
