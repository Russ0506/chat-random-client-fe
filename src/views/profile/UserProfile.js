import {
  Box,
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import NewPosterLayout from "./components/NewPosterLayout";
import myidol from "../profile/components/img/myidol.jpg";
// import $ from "jquery";
import { Link } from "react-router-dom";
import {
  StyledFemaleIcon,
  StyledMaleIcon,
} from "../common/base/icon/GenderIcon";
import AddIcon from "@mui/icons-material/Add";
import MyPostLayout from "./components/MyPostLayout";
import myPost1 from "../profile/components/img/post/myPost_1.jpg";
import myPost2 from "../profile/components/img/post/myPost_2.jpg";
import myPost3 from "../profile/components/img/post/myPost_3.jpg";
import myPost4 from "../profile/components/img/post/myPost_4.gif";
import PostCard from "./components/PostCard";

const postList = [
  {
    id: 1,
    title: "Tim kiem real love (K)",
    img: myPost1,
    like: 100,
  },
  {
    id: 2,
    title: "Tim kiem real love (K)",
    img: myPost2,
    like: 101,
  },
  {
    id: 3,
    title: "Tim kiem real love (K)",
    img: myPost3,
    like: 1000,
  },
  {
    id: 4,
    title: "Tim kiem real love (K)",
    img: myPost4,
    like: 10001,
  },
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

const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "300px",
  boxShadow: "none",
  backgroundColor: "gray",
  minWidth: "250px",
}));

export default function UserProfile() {
  const [gender, setGender] = React.useState("female");

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
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <NewPosterLayout />
        <MyPostLayout />
      </Container>
    </>
  );
}
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://i.pinimg.com/originals/65/9e/82/659e82e7eddcaab52961c135b7d97a4d.jpg",
    title: "Books",
  },
  {
    img: "https://i.pinimg.com/originals/1d/e5/b1/1de5b1350ddf2f37ee536aec562680e3.jpg",
    title: "Sink",
  },
  {
    img: "https://78.media.tumblr.com/9c6b32874418101d8504927371490cfe/tumblr_p3yognlkpJ1rlzlwyo4_1280.jpg",
    title: "Kitchen",
  },
  {
    img: "https://wallpapercave.com/wp/wp9392828.jpg",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "https://pbs.twimg.com/media/Ep_Z5-hUYAA_x7H.jpg",
    title: "Laptop",
  },
  {
    img: "https://play-lh.googleusercontent.com/Nk7N1X4GgErY53Lou96nDHqpPvwsVqlp5w7qnu-FDI4klBoDy9x0C2N6CcaY1358ZIc=w512",
    title: "Laptop",
  },
  {
    img: "https://wallpapers.com/images/high/korean-drama-iu-hotel-del-luna-m89lsnqk1iwimi0y.jpg",
    title: "Laptop",
  },
  {
    img: "https://photo-baomoi.bmcdn.me/w700_r1/2022_05_28_329_42733909/ebf4689d9adf73812ace.jpg",
    title: "Laptop",
  },
  {
    img: "https://i-giaitri.vnecdn.net/2019/08/13/1523531473-6b61ac9139d17084137a715ebccef47c-yoona-lim-snsd-yoona_m_460x0.jpg",
    title: "Laptop",
  },
  {
    img: "https://vnn-imgs-f.vgcloud.vn/2020/04/14/00/suzy-tinh-dau-quoc-dan-so-huu-khoi-tai-san-chuc-trieu-do-38.jpg",
    title: "Laptop",
  },
  {
    img: "https://afamilycdn.com/150157425591193600/2022/7/6/phan-ung-cua-netizen-han-khi-suzy-va-lee-dong-wook-chia-tay-1d2130c3-1657103885218486938283.jpg",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
];
