import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  ImageList,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import Badge from "@mui/material/Badge";
import NewPosterLayout from "./components/NewPosterLayout";
// import $ from "jquery";
import {
  StyledFemaleIcon,
  StyledMaleIcon,
} from "../common/base/icon/GenderIcon";

import {
  shapeCircleStyles,
  shapeStyles,
} from "../common/ShapeAvatar"
import PostLayout from "./components/PostLayout";
import AddIcon from "@mui/icons-material/Add";
import { axiosClient } from "../../setup/axiosClient";
import ImagePoster from "./components/ImagePoster";
import { URL } from "../../service/chat.service";
import { POST_COVER, POST_COVER_MB } from "../../constant/css_constant";
import { useTheme } from "@mui/styles";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch";

const URL_IMAGE = `${URL}/api`;

export default function UserProfilePage() {
  const { userId } = useParams();
  const [userData] = useFetch(`users/${userId}`);
  const [posterData, setPosterData] = React.useState({
    open : false,
    caption: "",
    no_of_reactions: 0,
    locaton: null,
    name: "",
    image: "",
    likeCount: 0,
    id: null,
    avatar: null,
  });
  const [listPosterData, setListPosterData] = React.useState([]);
  const [openNewPoster, setOpenNewPoster] = React.useState({
    value: false,
    type: "new",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  async function handleOpenPoster(item) {
    await setPosterData({
      open: true,
      avatar: item.user.avatar_path,
      content: item.caption,
      image: item.image_path,
      likeCount: item.no_of_reactions,
      id: item.id,
      avatar: item.user.avatar_path,
      location: item.location,
      name: item.user.name,
    });
  }

  async function handleClosePoster(type = null) {
    if(type === "delete") {
      await getPostList();
    }
    await setPosterData({...posterData, open: false})
  }

  function handleOpenNewPost(type) {
    setOpenNewPoster({ value: true, type: type });
  }
  async function handleCloseNewPost(data) {
    await getPostList();
    setOpenNewPoster({ value: false, type: "new" });
  }

  async function getPostList() {
    await axiosClient
      .get(`/users/${userId}/posts`)
      .then((data) => {
        const newData = data.map((item) => ({
          ...item,
          image_path: `${URL_IMAGE + item.image_path}`,
        }));
        setListPosterData(newData);
      })
      .catch(() => {});
  }

  useLayoutEffect(() => {
    setListPosterData([])
    getPostList();
  }, [userId]);

  return (
    <Container maxWidth="md" sx={{ justifyContent: "center", display: "flex" }}>
      <Stack
        flexDirection="column"
        maxWidth="100%"
        width="100%"
        position="relative"
        sx={{ pt: 4 }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          padding={{ xs: 1, sm: 1.5, md: 2, lg: 3 }}
          // marginTop={{ xs: 2, sm: 3 }}
          marginBottom="20px"
          flexWrap="nowrap"
          sx={{
            width: "100%",
            borderRadius: "5px",
            background: "#fff",
            maxHeight: "180px",
            boxShadow: "0 1px 20px 0 rgb(69 90 100 / 8%)",
            position: "relative",
          }}
        >
          {userId === localStorage.getItem("user_id") ? (
            <Button
              component={Link}
              to={"/users/profile/edit"}
              variant="outlined"
              // variant="contained"
              sx={{
                maxWidth: 180,
                border: "1px solid rgb(30 20 189 / 50%)",
                color: "rgb(30 20 189 / 70%)",
                position: "absolute",
                right: theme.spacing(2),
                top: theme.spacing(2),
              }}
              size="small"
            >
              Edit Profile
            </Button>
          ) : (
            <></>
          )}
          <Badge><Avatar alt = {userData?.name} src= {userData?.avatar_path} sx={{width: "150px", height: "150px", ...shapeStyles}} /></Badge>
          <Box sx={{ ml: 2 }}>
            <Stack flexDirection={{ xs: "column", md: "column" }}>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {userData?.name}
                {userData && (
                  <>
                    {userData.gender === "male" ? (
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
                  </>
                )}
              </Typography>
            </Stack>
            <Stack flexDirection="column" flexWrap="wrap" sx={{ mt: 2 }}>
              <Typography variant="body2">Hobbies: Tinder</Typography>
              <Typography variant="body2">
                Location: Cam Le, Danang, Viet Nam
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Box
          sx={{
            background: "#fff",
            borderRadius: "10px",
            padding: 2,
            width: "100%",
            boxShadow: "0 1px 20px 0 rgb(69 90 100 / 8%)",
            mb: 3,
          }}
        >
          <Box height="60px">
            <Stack flexDirection="row" justifyContent="space-between">
              {userId === localStorage.getItem("user_id") ? (
                <>
                  <Typography variant="h6" color="black">
                    My Posts
                  </Typography>
                  <Button
                    onClick={() => handleOpenNewPost("new")}
                    variant="outlined"
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
                </>
              ) : (
                <Typography variant="h6" color="black">
                  Partner Posts
                </Typography>
              )}
            </Stack>
            <Divider
              variant="middle"
              sx={{ width: "100%", mt: 1, mb: 3, ml: 0, mr: 0 }}
            />
          </Box>
          <Box
            sx={{
              // maxWidth: { md: 400, lg: 500, xl: 700 },
              width: "100%",
              // height: "calc(100% - 60px)",
              // overflow: "auto",
            }}
          >
            <ImageList
              variant="standard"
              cols={isMobile ? 2 : 3}
              gap={3}
              rowHeight={isMobile ? POST_COVER_MB : POST_COVER}
              style={{ overflow: "hidden" }}
            >
              <>
                {listPosterData.map((item, index) => (
                  <ImagePoster
                    key={index}
                    item={item}
                    index={index}
                    onClickImage={()=> handleOpenPoster(item)}
                  />
                ))}
              </>
            </ImageList>
          </Box>
          {openNewPoster.value === true ? (
            <NewPosterLayout
              open={openNewPoster.value}
              type={openNewPoster.type}
              posterData={openNewPoster.type == "new" ? {} : posterData}
              onClose={handleCloseNewPost}
            />
          ) : (
            <></>
          )}

          {posterData.open == true ? (
             <PostLayout
             isPartnerView={posterData?.id != localStorage.getItem('user_id')}
             open={posterData.open}
             onClose={handleClosePoster}
             data={posterData}
             onOpenEditBox={() => handleOpenNewPost("edit")}
           />
          ) : (
            <></>
          )}
         

           {/* <NewPosterLayout
              open={false}
              type={openNewPoster.type}
              posterData={openNewPoster.type == "new" ? {} : posterData}
              onClose={handleCloseNewPost}
            /> */}
        </Box>
      </Stack>
    </Container>
  );
}
