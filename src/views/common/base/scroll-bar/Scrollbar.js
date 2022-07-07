import PropTypes from "prop-types";
import SimpleBarReact from "simplebar-react";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import React, { useEffect } from "react";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "auto",
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({
  indentify = "",
  scrollBottom = false,
  children,
  sx,
  ...other
}) {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  // if (isMobile) {
  //   return (
  //     <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
  //       {children}
  //     </Box>
  //   );
  // }
  const [scrollHeight, setScrollHeight] = React.useState(0);

  useEffect(() => {
    if (scrollBottom === true && indentify !== "") {
      let element = document.getElementById(indentify);
      element.scrollTop = element.scrollHeight;
    }
  });

  return isMobile === true ? (
    <Box id={indentify !== "" ? indentify : ""} sx={{ ...sx }} {...other}>
      {children}
    </Box>
  ) : (
    <RootStyle id={indentify !== "" ? indentify : ""} className="chat-msg-list">
      {/* <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}> */}
      {children}
      {/* </SimpleBarStyle> */}
    </RootStyle>
  );
}
