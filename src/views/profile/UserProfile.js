import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grow,
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  Skeleton,
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
import img1 from "../profile/components/img/1.png";
import img2 from "../profile/components/img/2.png";
import img3 from "../profile/components/img/3.png";
import img4 from "../profile/components/img/4.png";
import img5 from "../profile/components/img/5.png";
import img6 from "../profile/components/img/6.png";
import PostLayout from "../homeScreen/components/PostLayout";
import { async } from "validate.js";
import ImagePoster from "./components/ImagePoster";
import { URL } from "../../service/chat.service"

const URL_IMAGE = `${URL}/api`
const fixArr = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 11,
];
const shapeStyles = {
  bgcolor: "primary.main",
  width: { xs: 80, md: 120 },
  height: { xs: 80, md: 120 },
  marginTop: 1,
};
const shapeCircleStyles = {
  borderRadius: "50%",
};

const imgList = [
  {
    userNm: "Russ",
    content: "Tim kiem real love",
    img: img1,
    postTm: "18-06-2022",
  },
  {
    userNm: "Russ",
    content: "Tim kiem real love",
    img: img2,
    postTm: "18-06-2022",
  },
  {
    userNm: "Russ",
    content: "Tim kiem real love",
    img: img3,
    postTm: "18-06-2022",
  },
  {
    userNm: "Russ",
    content: "Tim kiem real love",
    img: img4,
    postTm: "18-06-2022",
  },
  {
    userNm: "Russ",
    content: "Tim kiem real love",
    img: img5,
    postTm: "18-06-2022",
  },
  {
    userNm: "Russ",
    content: "Tim kiem real love",
    img: img6,
    postTm: "18-06-2022",
  },
  // {
  //   userNm: "Russ",
  //   content: "Tim kiem real love",
  //   img: img7,
  //   postTm: "18-06-2022",
  // },
];

export default function UserProfile() {
  const user_id = localStorage.getItem('user_id')
  const avatar_path = localStorage.getItem('avatar_path')
  const user_display_name= localStorage.getItem('user_display_name')
  const [gender, setGender] = React.useState("female");
  const [openPoster, setOpenPoster] = React.useState(false);
  const [posterData, setPosterData] = React.useState({
    caption: "",
    image_path: "",
    no_of_reactions: 0,
  });
  const [listPosterData, setListPosterData] = React.useState([]);
  const [openNewPoster, setOpenNewPoster] = React.useState(false);
  const [postCnt, setPostCnt] = React.useState(0);
  const [postLoadingCnt, setPostLoadingCnt] = React.useState(-1);
  const [postLoadingCntErr, setPostLoadingCntErr] = React.useState(0);
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
    setOpenNewPoster(false);
  }

  async function handleImgLoadErr() {
    await setPostLoadingCntErr(postLoadingCntErr + 1);
    await console.log(postLoadingCntErr);
  }

  async function getPostList() {
    await axiosClient
      .get(`/users/${user_id}/posts`)
      .then((data) => {
        setPostCnt(data.length);
        setPostLoadingCnt(0);
        const newData = data.map((item) => ({
          ...item,
          image_path: `${URL_IMAGE + item.image_path}`,
        }));
        setListPosterData(newData);
      })
      .catch(() => {});
  }

  useLayoutEffect(() => {
    getPostList();
  }, [openNewPoster]);

  return (
    <Container maxWidth="xl" sx={{ justifyContent: "center", display: "flex" }}>
      <Stack flexDirection="row" maxWidth="lg" width="100%" position="relative">
        <Container
          maxWidth="xl"
          sx={{
            width: "62%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            pt: 1,
          }}
        >
          {/* <Card
            sx={{
              maxWidth: { sm: 400, md: 750 },
              mb: "30px",
              // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              boxShadow: "0 1px 20px 0 rgb(69 90 100 / 8%)",
              width: "100%",
              borderRadius: "7px",
            }}
          >
            
            <CardContent>
             fsdfsdff
            </CardContent>
            
            <CardActions disableSpacing>
              sfvsfdsd
            </CardActions>
          </Card> */}
          {imgList.map((item, key) => (
            <PostLayout data={item} key={key} />
          ))}
        </Container>
        <Container
          // maxWidth={{ xs: "md", md: "xl" }}
          sx={{
            // minHeight: "100%",
            p: 1,
            display: "flex",
            justifyContent: { xs: "center", lg: "flex-start" },
            flexDirection: "column",
            alignItems: "flex-start",
            width: "38%",
            position: { sm: "relative", lg: "sticky" },
            top: 0,
            bottom: 0,
            // background: "rgb(247,247,253)",
            height: "calc(100vh - 70px)",
            overflow: "auto",
            // background:
            //   "linear-gradient(115deg, rgba(255,255,255,1) 0%, rgba(242,242,252,1) 25%, rgba(190,181,242,1) 100%)",
          }}
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
            }}
          >
            <Badge>{circle}</Badge>
            <Box sx={{ ml: 2 }}>
              <Stack flexDirection={{ xs: "column", md: "column" }}>
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Tuong Vy Bui Anh{" "}
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
                {/* <Button
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
                </Button> */}
              </Stack>
              <Stack
                flexDirection="column"
                flexWrap="wrap"
                display={{ xs: "none", md: "flex" }}
                sx={{ mt: 2 }}
              >
                <Typography variant="body2">Hobies: Tinder</Typography>
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
              height: "calc(100% - 200px)",
              width: "100%",
            }}
          >
            <Box height="60px">
              <Typography variant="h6" color="black">
                Images
              </Typography>
              <Divider
                variant="middle"
                sx={{ width: "100%", mt: 1, mb: 3, ml: 0, mr: 0 }}
              />
            </Box>
            <Box
              sx={{
                maxWidth: { md: 400, lg: 500, xl: 700 },
                width: "100%",
                height: "calc(100% - 60px)",
                overflow: "auto",
              }}
            >
              <ImageList
                variant="standard"
                cols={3}
                gap={0}
                rowHeight={164}
                style={{ overflow: "hidden" }}
              >
                <>
                  {listPosterData.map((item, index) => (
                    <ImagePoster item={item} index={index} handleOpenPoster={handleOpenPoster}/>
                  ))}
                </>
              </ImageList>
            </Box>
            {openNewPoster === true ? (
              <NewPosterLayout
                open={openNewPoster}
                onClose={handleCloseNewPost}
              />
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
          </Box>
        </Container>
      </Stack>
    </Container>
  );
}
