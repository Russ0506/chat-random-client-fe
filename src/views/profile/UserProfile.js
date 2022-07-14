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
import React from "react";
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
  const [gender, setGender] = React.useState("female");
  const [openPoster, setOpenPoster] = React.useState(false);
  const [posterData, setPosterData] = React.useState({
    content: "",
    image: "",
    likeCount: 0,
  });
  const [openNewPoster, setOpenNewPoster] = React.useState(false);
  const circle = (
    <Box
      component="span"
      sx={{
        ...shapeStyles,
        ...shapeCircleStyles,
        backgroundImage: `url(${myidol})`,
      }}
    />
  );
  function handleOpenPoster(item) {
    setPosterData({
      content: item.content,
      image: item.image,
      likeCount: item.likeCount,
    });
    setOpenPoster(true);
  }
  function handleClosePoster() {
    setOpenPoster(false);
  }
  function handleOpenNewPost() {
    setOpenNewPoster(true);
  }
  function handleCloseNewPost() {
    setOpenNewPoster(false);
  }

  return (
    <>
      <Container
        component="main"
        maxWidth={{ xs: "md", md: "xl" }}
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

        <Box sx={{ maxWidth: 800, height: "100%", overflowY: "auto" }}>
          {/* <Divider
            variant="middle"
            sx={{ width: "100%", mt: 5, mb: 3, ml: 0, mr: 0 }}
          /> */}
          <ImageList variant="masonry" cols={3} gap={8}>
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
          </ImageList>
        </Box>
        {openNewPoster === true ? (
          <NewPosterLayout open={openNewPoster} onClose={handleCloseNewPost} />
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
const itemData = [
  {
    image:
      "https://c4.wallpaperflare.com/wallpaper/51/258/367/iu-iu-lee-ji-eun-hd-wallpaper-preview.jpg",
    content: "Bed",
    likeCount: 1310,
  },
  {
    image:
      "https://i.pinimg.com/originals/65/9e/82/659e82e7eddcaab52961c135b7d97a4d.jpg",
    content: "Books",
    likeCount: 12300,
  },
  {
    image:
      "https://www.allkpop.com/upload/2021/12/content/231225/web_data/allkpop_1640280755_untitled-1.jpg",
    content: "Bed",
    likeCount: 1310,
  },
  {
    image:
      "https://i.pinimg.com/originals/1d/e5/b1/1de5b1350ddf2f37ee536aec562680e3.jpg",
    content: "Sink",
    likeCount: 21300,
  },
  {
    image:
      "https://78.media.tumblr.com/9c6b32874418101d8504927371490cfe/tumblr_p3yognlkpJ1rlzlwyo4_1280.jpg",
    content: "Kitchen",
    likeCount: 200,
  },
  {
    image: "https://wallpapercave.com/wp/wp9392828.jpg",
    content: "Blinds",
    likeCount: 3300,
  },
  {
    image: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    content: "Chairs",
    likeCount: 1340,
  },
  {
    image:
      "https://play-lh.googleusercontent.com/Nk7N1X4GgErY53Lou96nDHqpPvwsVqlp5w7qnu-FDI4klBoDy9x0C2N6CcaY1358ZIc=w512",
    content: "Laptop",
    likeCount: 1530,
  },
  {
    image:
      "https://wallpapers.com/images/high/korean-drama-iu-hotel-del-luna-m89lsnqk1iwimi0y.jpg",
    content: "Laptop",
    likeCount: 450,
  },
  {
    image:
      "https://photo-baomoi.bmcdn.me/w700_r1/2022_05_28_329_42733909/ebf4689d9adf73812ace.jpg",
    content: "Laptop",
    likeCount: 23420,
  },
  {
    image:
      "https://i-giaitri.vnecdn.net/2019/08/13/1523531473-6b61ac9139d17084137a715ebccef47c-yoona-lim-snsd-yoona_m_460x0.jpg",
    content: "Laptop",
    likeCount: 1432,
  },
  {
    image:
      "https://vnn-imgs-f.vgcloud.vn/2020/04/14/00/suzy-tinh-dau-quoc-dan-so-huu-khoi-tai-san-chuc-trieu-do-38.jpg",
    content: "Laptop",
    likeCount: 123420,
  },
  {
    image:
      "https://afamilycdn.com/150157425591193600/2022/7/6/phan-ung-cua-netizen-han-khi-suzy-va-lee-dong-wook-chia-tay-1d2130c3-1657103885218486938283.jpg",
    content: "Laptop",
    likeCount: 4230,
  },
  {
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    content: "Doors",
    likeCount: 144,
  },
  {
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    content: "Coffee",
    likeCount: 105,
  },
  {
    image: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    content: "Storage",
    likeCount: 103,
  },
  {
    image: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    content: "Candle",
    likeCount: 102,
  },
  {
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    content: "Coffee table",
    likeCount: 101,
  },
];
