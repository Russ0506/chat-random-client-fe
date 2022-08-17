import styled from "@emotion/styled";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import StarBorder from "@mui/icons-material/StarBorder";
import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { axiosClient } from "../../../../setup/axiosClient";
import { useSelector } from "../../../../store/store";
import ModalPoster from "./ModalPoster";
import { URL } from "../../../../service/chat.service";

const URL_IMAGE = `${URL}/api`;

export default function PartnerPoster(props) {
  const [open, setOpen] = React.useState(true);
  const currentConversation = useSelector(state => state.conversation.currentConversation)
  const [listPartnerPost, setListPartnerPost] = React.useState([]);

  useEffect(() => {
    if (currentConversation === null) return
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
      .catch(() => { });
  }, [currentConversation])

  const handleClick = () => {
    setOpen(!open);
  };
  return (
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
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Poster
            </Typography>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
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
              columns={{ xs: 8, sm: 4, md: 4, lg: 8, xl: 12, }}
              columnSpacing={{ xs: 0.5, sm: 0.5, md: 0.5 }}
            >
              {
                listPartnerPost.map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <ModalPoster item={item} partnerDetail={props.partnerInfor} />
                  </Grid>
                ))
              }
            </Grid>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
