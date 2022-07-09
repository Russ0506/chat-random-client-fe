import { Box, InputBase, List, ListItem, ListItemButton } from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import ChatInfoLayer from "./ChatInfoLayer";
import SearchIcon from "@mui/icons-material/Search";
import { axiosClient } from "../../../../setup/axiosClient";
import { changeConversation, seenConversation } from "../../../../features/chat/conversationSlice"
import { useDispatch } from 'react-redux';
import { setConversationsList } from "../../../../features/chat/conversationSlice"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  color: alpha(theme.palette.common.black, 0.5),
  "& .Mui-focused": {
    color: alpha(theme.palette.common.black, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
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

export default function ConversationsList(){
  const dispatch = useDispatch();
  const [conversations, setConversations] = React.useState([]);

  useEffect(() => {
    axiosClient.get(`conversations`).then((data)=>{
      setConversations(data);
      dispatch(setConversationsList(data));
    });
  }, [])

  const onChangeConversation = (item) => {
    dispatch(changeConversation(item))
    dispatch(seenConversation({conversation_id: item.id}))
  }
  return (
    <Box
      className="conversation-his-ctalog"
      sx={{
        background: "white",
        height: "calc(100% - 70px)",
        overflow: "auto"
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
        {conversations.map((item, k) => (
          <ListItem key={k} disablePadding>
            <ListItemButton onClick={()=> {onChangeConversation(item)}}>
              <ChatInfoLayer data={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
