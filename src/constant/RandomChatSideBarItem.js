import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HistoryIcon from "@mui/icons-material/History";
import BlockIcon from "@mui/icons-material/Block";

export const RandomChatSideBarItem = [
  {
    name: "GENERAL",
    items: [
      { index: 0, name: "Chats", icon: <ChatIcon />, link: "#" },
      { index: 1, name: "Group", icon: <GroupsIcon />, link: "#" },
      { index: 1, name: "Setting Chat", icon: <GroupsIcon />, link: "#" },
    ],
  },
  {
    name: "MANAGEMENT",
    items: [
      {
        index: 0,
        name: "Notifications",
        icon: <NotificationsIcon />,
        link: "#",
      },
      {
        index: 1,
        name: "Random Settings",
        icon: <ManageSearchIcon />,
        link: "#",
      },
      { index: 3, name: "Block History", icon: <BlockIcon />, link: "#" },
    ],
  },
];
