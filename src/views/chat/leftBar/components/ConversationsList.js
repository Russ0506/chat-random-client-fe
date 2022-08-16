import {
  Box,
  InputBase,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/styles";
import { alpha, useTheme } from "@mui/material/styles";
import Conversation from "./Conversation";
import SearchIcon from "@mui/icons-material/Search";
import { axiosClient } from "../../../../setup/axiosClient";
import {
  changeConversation,
  seenConversation,
  selectMostRecentConversationId,
  selectNewestConversations,
} from "../../../../features/chat/conversationSlice";
import { seenLastMessage } from "../../../../features/chat/messagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { onlineStatusSocket } from "../../../sockets/Socket";

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
  const newConversation = useSelector(selectNewestConversations);
  const [conversations, setConversations] = React.useState([]);
  const theme = useTheme();
  useEffect(() => {
    axiosClient.get(`conversations`).then((data) => {
      setConversations(data);
      data.forEach((conversation) => {
        onlineStatusSocket(conversation.partner.id);
      });
    });
  }, []);

  useEffect(() => {
    setConversations([newConversation, ...conversations]);
  }, [newConversation]);

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
    dispatch(
      seenLastMessage({
        preloadMessage: item.last_message,
        conversationId: item.id,
      })
    );
  };

  const RenderConversationsList = () => {
    if (conversations === []) return <></>;
    return conversations.map((conversation, k) => (
      <ListItem key={k} disablePadding>
        <ListItemButton
          sx={{ padding: 0, pl: 2, pr: 2, pt: 1 }}
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
          // height: "calc(100% - 70px)",
          height: "calc(100%)",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <Box
          sx={{ background: "#fff", position: "sticky", zIndex:10, p: theme.spacing(1), height: "75px" }}
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
        </Box>
        <List sx={{height: "calc(100% - 75px)", overflow: "auto"}}>
          <RenderConversationsList />
        </List>
      </Box>
    </>
  );
}
