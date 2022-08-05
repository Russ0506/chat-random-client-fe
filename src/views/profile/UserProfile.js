import {
  Avatar,
  Box,
  Container,
  Divider,
  ImageList,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useLayoutEffect } from "react";
import Badge from "@mui/material/Badge";
import NewPosterLayout from "./components/NewPosterLayout";
// import $ from "jquery";
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
import ImagePoster from "./components/ImagePoster";
import { URL } from "../../service/chat.service";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const URL_IMAGE = `${URL}/api`;
const shapeStyles = {
  bgcolor: "primary.main",
  width: { xs: 60, md: 60 },
  height: { xs: 60, md: 60 },
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
];

export default function UserProfile() {
  const user_id = localStorage.getItem("user_id");
  const avatar_path = localStorage.getItem("avatar_path");
  const user_display_name = localStorage.getItem("user_display_name");
  const [gender, setGender] = React.useState("female");
  const [openPoster, setOpenPoster] = React.useState(false);
  const [posterData, setPosterData] = React.useState({
    caption: "",
    image_path: "",
    no_of_reactions: 0,
  });
  const [listPosterData, setListPosterData] = React.useState([]);
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
    setOpenNewPoster(false);
  }

  async function getPostList() {
    await axiosClient
      .get(`/users/${user_id}/posts`)
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
    getPostList();
  }, [openNewPoster]);

  return (
    <Container maxWidth="xl" sx={{ justifyContent: "center", display: "flex" }}>
      <Stack
        flexDirection="row"
        maxWidth="md"
        width="100%"
        position="relative"
        sx={{ pt: 4 }}
      >
        <Container
          maxWidth="xl"
          sx={{
            width: "60%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {imgList.map((item, key) => (
            <PostLayout data={item} key={key} />
          ))}
        </Container>
        <Container
          // maxWidth={{ xs: "md", md: "xl" }}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", lg: "flex-start" },
            flexDirection: "column",
            alignItems: "flex-start",
            width: "40%",
            position: { sm: "relative", lg: "sticky" },
            top: 5,
            bottom: 0,
            // background: "rgb(247,247,253)",
            height: "calc(100vh - 70px)",
            overflow: "auto",
            // background:
            //   "linear-gradient(115deg, rgba(255,255,255,1) 0%, rgba(242,242,252,1) 25%, rgba(190,181,242,1) 100%)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              // borderRadius: "5px",
              // background: "#fff",
              // maxHeight: "180px",
              // boxShadow: "0 1px 20px 0 rgb(69 90 100 / 8%)",
            }}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              // padding={{ xs: 1, md: 2, lg: 1 }}
              // marginTop={{ xs: 2, sm: 3 }}
              marginBottom="20px"
              flexWrap="nowrap"
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
                    {localStorage.getItem("user_display_name")}{" "}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              // background: "#fff",
              // borderRadius: "10px",
              // padding: 2,
              // height: "calc(100% - 200px)",
              width: "100%",
              // boxShadow: "0 1px 20px 0 rgb(69 90 100 / 8%)",
            }}
          >
            <Box height="60px" width="xl">
              <Typography variant="subtitle1" color="rgb(142, 142, 142)" fontWeight="bold">
                Shared Partner List
              </Typography>
              {/* <Divider
                variant="middle"
                sx={{ width: "100%", mt: 1, ml: 0, mr: 0 }}
              /> */}
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                }}
                aria-label="contacts"
              >
                <ListItem
                  disablePadding
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ListItemButton sx={{ pl: 0, ml: 0 }}>
                    <ListItemIcon>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          color="black"
                          fontWeight="bold"
                        >
                          Chelsea Otakan
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ListItemButton sx={{ pl: 0, ml: 0 }}>
                    <ListItemIcon>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          color="black"
                          fontWeight="bold"
                        >
                          Eric Homande
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ListItemButton sx={{ pl: 0, ml: 0 }}>
                    <ListItemIcon>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          color="black"
                          fontWeight="bold"
                        >
                          Eric Hoffman
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ListItemButton sx={{ pl: 0, ml: 0 }}>
                    <ListItemIcon>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          color="black"
                          fontWeight="bold"
                        >
                          Eric Hoffman
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ListItemButton sx={{ pl: 0, ml: 0 }}>
                    <ListItemIcon>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          color="black"
                          fontWeight="bold"
                        >
                          Eric Hoffman
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            <Box
              sx={{
                maxWidth: { md: 400, lg: 500, xl: 700 },
                width: "100%",
                height: "calc(100% - 60px)",
                overflow: "auto",
              }}
            ></Box>
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
