import { Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import PostLayout from "./components/PostLayout";
import img1 from "../homeScreen/img/1.png";
import img2 from "../homeScreen/img/2.png";
import img3 from "../homeScreen/img/3.png";
import img4 from "../homeScreen/img/4.png";
import img5 from "../homeScreen/img/5.png";
import img6 from "../homeScreen/img/6.png";
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

export default function HomeScreen() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: 2,
        /* background: "rgb(236, 236, 250)"  */ background: "#f7f7fd",
      }}
    >
      <Container maxWidth="lg"  sx={{alignItems:"center"}}>
        <Stack sx={{alignItems:"center"}}>
          {imgList.map((item, key) => (
            <PostLayout data={item} key={key} />
          ))}
        </Stack>
      </Container>
    </Container>
  );
}
