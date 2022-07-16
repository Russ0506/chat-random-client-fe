import {
  Box,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import Conversation from "./Conversation";
import SearchIcon from "@mui/icons-material/Search";
import { axiosClient } from "../../../../setup/axiosClient";
import {
  changeConversation,
  seenConversation,
  selectMostRecentConversationId,
} from "../../../../features/chat/conversationSlice";
import { seenLastMessage } from "../../../../features/chat/messagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { DRAWER_WITH } from "../../../../constant/css_constant";
import ConversationControlBox from "../../topBar/startConversation/ConversationControlBox";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  margin: theme.spacing(1),
  backgroundColor: alpha(theme.palette.common.white, 1),
  color: alpha(theme.palette.common.black, 0.5),
  border: "1px solid rgb(0 0 0 / 7%)",
  borderRadius: "5px",
  "& .Mui-focused": {
    color: alpha(theme.palette.common.black, 1),
  },
  // width: "100%",
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(3),
  //   width: "auto",
  // },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& input::placeholder": {
    color: "gray",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function ConversationsList() {
  const dispatch = useDispatch();
  const recentConversationId = useSelector(selectMostRecentConversationId);
  const [conversations, setConversations] = React.useState([]);

  useEffect(() => {
    axiosClient.get(`conversations`).then((data) => {
      setConversations(data);
    });
  }, []);

  useEffect(() => {
    let orderedConversations = [];
    const recentConvcersation = conversations.find(
      (conversation) => conversation.id == recentConversationId
    );
    if (recentConvcersation) orderedConversations.push(recentConvcersation);
    conversations.forEach((conversation) => {
      if (conversation.id != recentConversationId)
        orderedConversations.push(conversation);
    });
    setConversations(orderedConversations);
  }, [recentConversationId]);

  const onChangeConversation = (item) => {
    dispatch(changeConversation(item));
    dispatch(seenConversation({ conversationId: item.id }));
    dispatch(seenLastMessage({ conversationId: item.id }));
  };

  const RenderConversationsList = () => {
    if (conversations === []) return <></>;
    return conversations.map((conversation, k) => (
      <ListItem key={k} disablePadding>
        <ListItemButton
          sx={{ padding: { xs: 0 }, paddingLeft: { xs: 2 } }}
          onClick={() => {
            onChangeConversation(conversation);
          }}
        >
          <Conversation data={conversation} />
        </ListItemButton>
      </ListItem>
    ));
  };
  return (
    <>
      <Box
        className="conversation-his-ctalog"
        sx={{
          background: "white",
          height: "calc(100% - 70px)",
          overflowY: "auto",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "gray" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <List>
          <RenderConversationsList />
        </List>
      </Box>
      <Stack
        width={DRAWER_WITH}
        height="70px"
        padding={{ xs: 1 }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="flex-start"
        paddingBottom={2.8}
      >
        <ConversationControlBox />
      </Stack>
    </>
  );
}
