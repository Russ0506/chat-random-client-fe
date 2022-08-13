import {
  Avatar,
  Box,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import PostLayout from "./components/PostLayout";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";
import { axiosClient } from "../../setup/axiosClient";
import useFetch from "../../utils/useFetch";

const shapeStyles = {
  bgcolor: "primary.main",
  width: { xs: 52, md: 52 },
  height: { xs: 52, md: 52 },
  marginTop: 1,
};
const shapeCircleStyles = {
  borderRadius: "50%",
};

export default function NewsFeed() {
  const avatar_path = localStorage.getItem("avatar_path");
  const [posts, setPosts] = useState([]);
  const [partners] = useFetch("partners", []);
  console.log(partners);

  useEffect(() => {
    axiosClient
      .get(`posts`)
      .then((data) => {
        setPosts(data);
      })
      .catch(() => {});
  }, []);

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
          {posts.map((item, key) => (
            <PostLayout data={item} key={key} />
          ))}
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: { xs: "center", lg: "flex-start" },
            flexDirection: "column",
            alignItems: "flex-start",
            width: "40%",
            position: { sm: "relative", lg: "sticky" },
            top: 5,
            bottom: 0,
            height: "calc(100vh - 70px)",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
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
              width: "100%",
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
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                }}
                aria-label="contacts"
              >
                {partners.map((partner, i) => (
                  <ListItem
                    disablePadding
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        <NavigateNextIcon />
                      </IconButton>
                    }
                    sx={{ borderRadius: "10px", overflow: "hidden" }}
                    key={i}
                  >
                    <ListItemButton sx={{ pl: 1 }} component={Link} to={`users/${partner.id}/profile`}>
                      <ListItemIcon>
                        <Avatar
                          alt={partner.name}
                          src={partner.avatar_path}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle2"
                            color="black"
                            fontWeight="500"
                          >
                            {partner.name}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
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
