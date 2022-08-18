import {
  Avatar,
  Box,
  Button,
  Divider,
  ImageList,
  List,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosClient } from "../../../../setup/axiosClient";
import { URL } from "../../../../service/chat.service";
import {
  StyledFemaleIcon,
  StyledMaleIcon,
} from "../../../common/base/icon/GenderIcon";
import { POST_COVER, POST_COVER_MB } from "../../../../constant/css_constant";
import ImagePoster from "../../../profile/components/ImagePoster";
import PostLayout from "../../../profile/components/PostLayout";
import { Link } from "react-router-dom";
const URL_IMAGE = `${URL}/api`;
export default function SharedPartnerInfo(props) {
  const [listPartnerPost, setListPartnerPost] = React.useState([]);
  const currentConversation = useSelector(
    (state) => state.conversation.currentConversation
  );
  const [openPoster, setOpenPoster] = React.useState(false);
  const [posterData, setPosterData] = React.useState({
    open : false,
    caption: "",
    no_of_reactions: 0,
    locaton: null,
    name: "",
    image: "",
    likeCount: 0,
    avatar : "",
    id: null,
  });
  function handleOpenPoster(item) {
    setPosterData({
      content: item.caption,
      image: item.image_path,
      likeCount: item.no_of_reactions,
      id: item.id,
      location: item.location,
      name: item.user.name,
      avatar: URL_IMAGE +item.user.avatar_path,
      open: true
    });
  }
  async function handleClosePoster() {
    await setPosterData({...posterData, open: false})
  }

  useEffect(() => {
    if (currentConversation === null) return;
    axiosClient
      .get(`/users/${currentConversation?.partner?.id}/posts`)
      .then((data) => {
        const newData = data.map((item) => ({
          ...item,
          image_path: `${URL_IMAGE + item.image_path}`,
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
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{
            width: "100%",
            pt: isMobile === true ? 6 : 2,
            mb: 0,
            pl: isMobile === true ? 0 : 2,
          }}
          flexGrow={1}
        >
          <Avatar
            src={URL_IMAGE + props.partnerInfor.avatar_path}
            alt={props.partnerInfor.name}
            style={{ width: 78, height: 78 }}
          />
          <Stack flexDirection="row">
            <Typography
              variant="h5"
              textTransform="uppercase"
              fontWeight={600}
              textAlign="center"
              sx={{ mt: 1 }}
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
        <Button
          component={Link}
          to={`/users/profile/${currentConversation?.partner?.id}`}
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
          View Profile
        </Button>
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
            overflow: "auto",
            height: "inherit",
            pb: 1
          }}
        >
          <ImageList
            variant="standard"
            cols={isMobile ? 2 : 2}
            gap={1}
            rowHeight={isMobile ? POST_COVER_MB : 170}
            style={{ overflow: "hidden" }}
          >
            <>
              {listPartnerPost.map((item, index) => (
                <ImagePoster
                  key={index}
                  item={item}
                  index={index}
                  height={170}
                  mbHeight={POST_COVER_MB}
                  onClickImage={()=> handleOpenPoster(item)}
                />
              ))}
            </>
          </ImageList>
        </Box>
        <PostLayout
            isPartnerView = {true}
            open={posterData.open}
            onClose={handleClosePoster}
            data={posterData}
          />
      </List>
    </>
  );
}
