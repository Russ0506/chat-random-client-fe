import {
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
// import $ from "jquery";
import img1 from "../profile/components/img/1.png";
import img2 from "../profile/components/img/2.png";
import img3 from "../profile/components/img/3.png";
import img4 from "../profile/components/img/4.png";
import img5 from "../profile/components/img/5.png";
import img6 from "../profile/components/img/6.png";
import PostLayout from "./components/PostLayout";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const shapeStyles = {
  bgcolor: "primary.main",
  width: { xs: 52, md: 52 },
  height: { xs: 52, md: 52 },
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
  const avatar_path = localStorage.getItem("avatar_path");

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
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  color="rgb(142, 142, 142)"
                  fontWeight="bold"
                >
                  Shared Partner List
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{ cursor: "pointer" }}
                  onClick={() => alert("chua lam :>")}
                >
                  See All
                </Typography>
              </Stack>
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
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <NavigateNextIcon />
                    </IconButton>
                  }
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ListItemButton sx={{ pl: 1 }}>
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
                          fontWeight="500"
                        >
                          Chelsea Otakan
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <NavigateNextIcon />
                    </IconButton>
                  }
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ListItemButton sx={{ pl: 1 }}>
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
                          fontWeight="500"
                        >
                          Eric Homande
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <NavigateNextIcon />
                    </IconButton>
                  }
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ListItemButton sx={{ pl: 1 }}>
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
                          fontWeight="500"
                        >
                          Eric Hoffman
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <NavigateNextIcon />
                    </IconButton>
                  }
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ListItemButton sx={{ pl: 1 }}>
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
                          fontWeight="500"
                        >
                          Eric Hoffman
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <NavigateNextIcon />
                    </IconButton>
                  }
                  sx={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  <ListItemButton sx={{ pl: 1 }}>
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
                          fontWeight="500"
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
          </Box>
        </Container>
      </Stack>
    </Container>
  );
}
