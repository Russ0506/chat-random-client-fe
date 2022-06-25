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
import React, { useLayoutEffect } from "react";
import { RandomChatSideBarItem } from "../../../constant/RandomChatSideBarItem";
import Box from "@mui/material/Box"
import PartnerSettingModal from "../../chat/popup/PartnerSettingModal";
import {makeStyles} from "@mui/styles"
// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDataSearch } from "../../../features/user-setting";

export default function DrawerSideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const drawerWidth = 350;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const useStyles = makeStyles({
    drawerPaper: {
      marginTop: "64px",
      paddingTop: "0px",
    }
  });

  const classes = useStyles();

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <Box>
      {/* <Toolbar /> */}
      {/* <MediaControlCard /> */}
      {RandomChatSideBarItem.map((component, i) => (
        <Box key={i}>
          <ListItem>
              {
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
    </Box>
  );
  return (
    <>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      {/* <Drawer
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
      </Drawer> */}
      <Drawer
      classes={{
        paper: classes.drawerPaper
      }}
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
