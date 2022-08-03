import { Button, Stack } from "@mui/material";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { icoList } from "../../../constant/AppBarConstant";
import { APP_BAR_HEIGHT } from "../../../constant/css_constant";
import Homepage from "../../Homepage";
import NewPosterLayout from "../../profile/components/NewPosterLayout";
import Iconify from "../base/icon/Iconify";
import CherishAppBar from "./CherishAppBar";
const sidePadding = 38;
export default function CherishApp({ index = 1, body }) {
  const [useNewPost, setUseNewPost] = React.useState(false);
  function handleOpenNewPost() {
    setUseNewPost(true);
  }
  function handleCloseNewPost() {
    setUseNewPost(false);
  }

  return (
    <Stack flexDirection="row">
      {/* <Stack
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          width: 0,
          p: sidePadding + "px",
          borderRight: "1px solid #e5e0e0",
          background: "#fff",
          // boxShadow: "0 1px 20px 0 rgb(69 90 100 / 8%)",
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
          <ButtonNav component={Link} to={icoList.home.link}>
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
          <ButtonNav component={Link} to={icoList.chat.link}>
            <Iconify
              icon={icoList.chat.notChosen}
              style={{ width: "28px", height: "28px" }}
            />
          </ButtonNav>
        )}
        {index == 3 ? (
          <ChosenButtonNav>
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
          <ChosenButtonNav onClick={(e) => handleOpenNewPost()}>
            <Iconify
              icon={icoList.newPost.notChosen}
              style={{ width: "30px", height: "30px" }}
            />
          </ChosenButtonNav>
        ) : (
          <ButtonNav onClick={(e) => handleOpenNewPost()}>
            <Iconify
              icon={icoList.newPost.notChosen}
              style={{ width: "28px", height: "28px" }}
            />
          </ButtonNav>
        )}
      </Stack> */}

      <Box
        // width={{ xs: "100vw", md: `calc(100vw - ${sidePadding * 2 + 1}px)` }}
        width="100vw"
        sx={{ height: "100vh" }}
      >
        <CherishAppBar index={index} />
        <Box
          sx={{
            width: "100%",
            height: `calc(100vh - ${APP_BAR_HEIGHT})`,
            overflow: "auto",
          }}
        >
          {body}
        </Box>
        {useNewPost == true ? (
          <NewPosterLayout open={true} onClose={handleCloseNewPost} />
        ) : (
          ""
        )}
      </Box>
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
  transition: "all 0.2s ease",
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
