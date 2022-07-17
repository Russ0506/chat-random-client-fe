import {
  Box,
  Button,
  Container,
  Grow,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import NewPosterLayout from "./components/NewPosterLayout";
import myidol from "../profile/components/img/myidol.jpg";
// import $ from "jquery";
import { Link } from "react-router-dom";
import {
  StyledFemaleIcon,
  StyledMaleIcon,
} from "../common/base/icon/GenderIcon";
import MyPostLayout from "./components/MyPostLayout";
import AddIcon from "@mui/icons-material/Add";
import { axiosClient } from "../../setup/axiosClient";

const URL = 'http://localhost:3000/api'

const shapeStyles = {
  bgcolor: "primary.main",
  width: { xs: 80, md: 120 },
  height: { xs: 80, md: 120 },
  marginTop: 1,
};
const shapeCircleStyles = {
  borderRadius: "50%",
};

export default function UserProfile() {
  const user_id = localStorage.getItem('user_id')
  const avatar_path = `${URL}/${localStorage.getItem('avatar_path')}`
  const user_display_name= localStorage.getItem('user_display_name')
  const [gender, setGender] = React.useState("female");
  const [openPoster, setOpenPoster] = React.useState(false);
  const [posterData, setPosterData] = React.useState({
    caption: "",
    image_path: "",
    no_of_reactions: 0,
  });
  const [listPosterData, setListPosterData] = React.useState([])
  const [openNewPoster, setOpenNewPoster] = React.useState(false);
  const circle = (
    <Box
      component="span"
      sx={{
        ...shapeStyles,
        ...shapeCircleStyles,
        backgroundImage: `url(${avatar_path})`,
      }}
    />
  );
  function handleOpenPoster(item) {
    setPosterData({
      content: item.caption,
      image: item.image_path,
      likeCount: item.no_of_reactions,
    });
    setOpenPoster(true);
  }
  function handleClosePoster() {
    setOpenPoster(false);
  }
  function handleOpenNewPost() {
    setOpenNewPoster(true);
  }
  function handleCloseNewPost(newpostdata) {
    setOpenNewPoster(false)
  }

  async function getPostList() {
    await axiosClient.get(`/users/${user_id}/posts`).then((data) => {
      const  newData = data.map(item => ({...item, image_path: `${URL + item.image_path}`}))
      setListPosterData(newData)
    }) .catch(() => {
    });
  }

  useLayoutEffect(() => {
    getPostList()
  }, [openNewPoster])

  return (
    <>
      <Container
        component="main"
        // maxWidth={{ xs: "md", md: "xl" }}
        sx={{
          p: 1,
          display: "flex",
          justifyContent: { xs: "center", lg: "flex-start" },
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "flex-start",
          background: "rgb(247,247,253)",
          background:
            "linear-gradient(115deg, rgba(255,255,255,1) 0%, rgba(242,242,252,1) 25%, rgba(190,181,242,1) 100%)",
        }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          padding={{ xs: 1, sm: 1.5, md: 2, lg: 5 }}
          marginTop={{ xs: 2, sm: 3 }}
          marginBottom={{ xs: 2.5, sm: 3 }}
          flexWrap="nowrap"
          sx={{
            width: "100%",
            position: { sm: "relative", lg: "sticky" },
            top: 0,
          }}
        >
          <Badge>{circle}</Badge>
          <Box sx={{ ml: 2 }}>
            <Stack flexDirection={{ xs: "column", md: "column" }}>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {user_display_name}
                {gender === "male" ? (
                  <StyledMaleIcon
                    fontSize="18px"
                    sx={{
                      ...shapeCircleStyles,
                      pb: "5px",
                    }}
                  />
                ) : (
                  <StyledFemaleIcon
                    fontSize="18px"
                    sx={{
                      ...shapeCircleStyles,
                      pb: "5px",
                    }}
                  />
                )}
              </Typography>
              <Button
                component={Link}
                to={"/users/profile/edit"}
                variant="outlined"
                sx={{
                  ml: 1,
                  mb: 1,
                  maxWidth: 180,
                  border: "1px solid rgb(30 20 189 / 50%)",
                  color: "rgb(30 20 189 / 70%)",
                }}
                size="small"
              >
                Edit profile
              </Button>
              <Button
                onClick={handleOpenNewPost}
                variant="outlined"
                // variant="contained"
                sx={{
                  ml: 1,
                  mb: 1,
                  maxWidth: 180,
                  border: "1px solid rgb(30 20 189 / 50%)",
                  color: "rgb(30 20 189 / 70%)",
                }}
                size="small"
                startIcon={<AddIcon />}
              >
                New Post
              </Button>
            </Stack>
            <Stack
              flexDirection="column"
              flexWrap="wrap"
              display={{ xs: "none", md: "flex" }}
              sx={{ mt: 2 }}
            >
              <Typography variant="body1">Hobies: Tinder</Typography>
              <Typography variant="body1">
                Location: Cam Le, Danang, Viet Nam
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Box sx={{ maxWidth: { md: 500, lg: 600, xl: 800 }, height: "100%", overflowY: "auto" }}>
          {/* <Divider
            variant="middle"
            sx={{ width: "100%", mt: 5, mb: 3, ml: 0, mr: 0 }}
          /> */}
          {/* <ImageList variant="masonry" cols={3} gap={8}>
            {itemData.map((item, index) => (
              <Grow
                in={true}
                style={{ transformOrigin: "0 0 0 0" }}
                {...(true ? { timeout: index * 150 } : {})}
              >
                <ImageListItem key={item.image}>
                  <img
                    // src={`${item.image}?w=248&fit=crop&auto=format`}
                    // srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.image}`}
                    srcSet={`${item.image}`}
                    alt={item.content}
                    loading="lazy"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpenPoster(item)}
                  />
                </ImageListItem>
              </Grow>
            ))}
          </ImageList> */}
          <ImageList variant="masonry" cols={3} gap={8}>
            {listPosterData.map((item, index) => (
              <Grow
                key={index}
                in={true}
                style={{ transformOrigin: "0 0 0 0" }}
                {...(true ? { timeout: index * 150 } : {})}
              >
                <ImageListItem key={item.image}>
                  <img
                    src={item.image_path ? `${item.image_path}` : "https://hangnhatxachtay.co/wp-content/uploads/2015/05/hello_kitty.png"}
                    srcSet={item.image_path ? `${item.image_path}` : "https://hangnhatxachtay.co/wp-content/uploads/2015/05/hello_kitty.png"}
                    alt={item.caption}
                    loading="lazy"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpenPoster(item)}
                  />
                </ImageListItem>
              </Grow>
            ))}
          </ImageList>
        </Box>
        {openNewPoster === true ? (
          <NewPosterLayout open={openNewPoster} onClose={handleCloseNewPost} userDisplayName = {user_display_name} avatarPath = {avatar_path} />
        ) : (
          <></>
        )}
        {openPoster === true ? (
          <MyPostLayout
            open={openPoster}
            onClose={handleClosePoster}
            data={posterData}
          />
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
