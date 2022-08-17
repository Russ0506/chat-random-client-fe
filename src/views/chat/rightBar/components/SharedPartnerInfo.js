import {
  Avatar,
  Box, Divider, ImageList,
  List, Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { POST_COVER, POST_COVER_MB } from "../../../../constant/css_constant";
import { URL } from "../../../../service/chat.service";
import { axiosClient } from "../../../../setup/axiosClient";
import {
  StyledFemaleIcon,
  StyledMaleIcon
} from "../../../common/base/icon/GenderIcon";
import ImagePoster from "../../../profile/components/ImagePoster";
import PostLayout from "../../../profile/components/PostLayout";
const URL_IMAGE = `${URL}/api`;
export default function SharedPartnerInfo(props) {
  const [listPartnerPost, setListPartnerPost] = React.useState([]);
  const currentConversation = useSelector(
    (state) => state.conversation.currentConversation
  );
  const [openPoster, setOpenPoster] = React.useState(false);
  const [posterData, setPosterData] = React.useState({
    caption: "",
    image_path: "",
    no_of_reactions: 0,
  });
  function handleOpenPoster(item) {
    setPosterData({
      content: item.caption,
      image: item.image_path,
      likeCount: item.no_of_reactions,
      id: item.id,
    });
    setOpenPoster(true);
  }
  async function handleClosePoster() {
    setTimeout(() => {
      setOpenPoster(false);
    }, 500);
  }

  useEffect(() => {
    if (currentConversation === null) return;
    axiosClient
      .get(`/users/${currentConversation?.partner?.id}/posts`)
      .then((data) => {
        const newData = data.map((item) => ({
          ...item,
          image_path: `${URL_IMAGE + item.image_path}`,
          // image_path: `${"http://localhost:3000/api" + item.image_path}`,
        }));
        setListPartnerPost(newData);
      })
      .catch(() => {});
  }, [currentConversation]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Stack flexDirection="column" justifyContent="center" alignItems="center">
        <Stack
          justifyContent={isMobile === true ? "center" : "flex-start"}
          alignItems="center"
          flexDirection="row"
          sx={{
            width: "100%",
            pt: isMobile === true ? 6 : 2,
            mb: 3,
            pl: isMobile === true ? 0 : 2,
          }}
          flexGrow={1}
        >
          <Avatar
            src={URL_IMAGE + props.partnerInfor.avatar_path}
            alt={props.partnerInfor.name}
            style={{ width: 80, height: 80 }}
          />
          <Typography
            variant="h5"
            textTransform="uppercase"
            fontWeight={600}
            textAlign="center"
            sx={{ ml: 2 }}
            color="#636363"
          >
            {props.partnerInfor.name}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={600}
            textAlign="center"
            sx={{ pb: 1 }}
          >
            {props.partnerInfor.gender === "male" ? (
              <StyledMaleIcon />
            ) : (
              <StyledFemaleIcon />
            )}
          </Typography>
        </Stack>
      </Stack>
      <List
        sx={{ width: "100%", backgroundColor: "#fff", height: "100%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        //   subheader={
        //     <ListSubheader component="div" id="nested-list-subheader">
        //       Nested List Items
        //     </ListSubheader>
        //   }
      >
        <Box sx={{ pl: 1, pr: 1 }}>
          <Typography
            variant="h6"
            component="span"
            color="rgb(142, 142, 142)"
            fontWeight="bold"
          >
            Partner Posts
          </Typography>
          <Divider
            variant="middle"
            sx={{ width: "100%", mt: 1, mb: 1, ml: 0, mr: 0 }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <ImageList
            variant="standard"
            cols={isMobile ? 2 : 2}
            gap={3}
            rowHeight={isMobile ? POST_COVER_MB : POST_COVER}
            style={{ overflow: "hidden" }}
          >
            <>
              {listPartnerPost.map((item, index) => (
                <ImagePoster
                  key={index}
                  item={item}
                  index={index}
                  handleOpenPoster={handleOpenPoster}
                />
              ))}
            </>
          </ImageList>
        </Box>
        {openPoster === true ? (
          <PostLayout
            open={openPoster}
            onClose={handleClosePoster}
            data={posterData}
          />
        ) : (
          <></>
        )}
        {/* <Collapse
          in={true}
          timeout="auto"
          unmountOnExit
          sx={{
            maxHeight: window.innerHeight / 2.2,
            overflow: "auto",
            minHeight: 300,
          }}
        >
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <Grid
                sx={{ width: "100%", overflow: "auto" }}
                container
                rowSpacing={1}
                columns={{ xs: 8, sm: 4, md: 4, lg: 8, xl: 12 }}
                columnSpacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}
              >
                {listPartnerPost.map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <ModalPoster
                      item={item}
                      partnerDetail={props.partnerInfor}
                    />
                  </Grid>
                ))}
              </Grid>
            </ListItem>
          </List>
        </Collapse> */}
      </List>
    </>
  );
}
