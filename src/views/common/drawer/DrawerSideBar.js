import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { RandomChatSideBarItem } from "../../../constant/RandomChatSideBarItem";
import MediaControlCard from "../base/card/MediaControlCard";
import { FixedSizeList } from 'react-window';
import PartnerSetting from '../../pages/chat/popup/PartnerSetting'
import Box from "@mui/material/Box"
import PartnerSettingView from "../../pages/chat/popup/PartnerSettingView";
import PartnerSettingModal from "../../pages/chat/popup/PartnerSettignModal";

export default function DrawerSideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openPartnerDialog, setOpenPartnerDialog] = React.useState(false);
  const [openPartnerViewDialog, setOpenPartnerViewDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenPartnerDialog(true);
  };

  const handleOpenViewSettingModal = () => {
    setOpenPartnerViewDialog(true);
  };

  const handlePartnerSettingClose = () => {
    setOpenPartnerDialog(false);
  };

  const handleParnerSettingViewClose = () => {
    setOpenPartnerViewDialog(false);
  };

  const drawerWidth = 240;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <Box>
      <Toolbar />
      {/* <MediaControlCard /> */}
      {RandomChatSideBarItem.map((component, i) => (
        <Box key={i}>
          <ListItem>
              {
                (i===2) ?
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }} onClick={handleClickOpen}>
                  {component.name}
                </Typography>
                :
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {component.name}
                  </Typography>
              }
          </ListItem>
          <List>
            {component.items.map((item, k) => (
              // <FixedSizeList height={400} width={360} itemSize={46} itemCount={200}>
                <ListItem key={k} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              // </FixedSizeList>
            ))}
          </List>
        </Box>
      ))}
      {/* <PartnerSetting open={openPartnerDialog} onClose={handlePartnerSettingClose} handleOpenViewSettingModal={handleOpenViewSettingModal}>
      </PartnerSetting>
      <PartnerSettingView open={openPartnerViewDialog} onClose={handleParnerSettingViewClose}>
      </PartnerSettingView> */}
      {/* <Divider variant="middle" /> */}
      <PartnerSettingModal open={openPartnerDialog} onClose={handlePartnerSettingClose} handleOpenViewSettingModal={handleOpenViewSettingModal}></PartnerSettingModal>
    </Box>
  );
  return (
    <>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}
