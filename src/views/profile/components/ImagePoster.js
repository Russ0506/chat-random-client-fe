import { Grow, ImageListItem, Skeleton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { POST_COVER, POST_COVER_MB } from "../../../constant/css_constant";
import errImg from "../components/img/errImg.png";
const defaultImg = errImg;
export default function ImagePoster(props) {
  const [loadingContext, setLoadingContext] = useState(true);
  const [src, setSrc] = useState(props.item.image_path);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: isMobile ? POST_COVER_MB : POST_COVER,
          padding: "5px",
          borderRadius: "4px",
          display: loadingContext ? "" : "none",
          opacity: loadingContext ? "1" : "0",
          overflow: "hidden",
          transition: "all 0.25s ease",
          border: "1px solid #efefef",
        }}
      >
        <Grow
          key={props.index}
          in={true}
          style={{
            transformOrigin: "0 0 0 0",
            transition: "all 0.25s ease",
          }}
          {...(true ? { timeout: props.index * 150 } : {})}
        >
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Grow>
      </Box>
      <Grow
        key={props.index}
        in={true}
        style={{
          transformOrigin: "0 0 0 0",
          opacity: loadingContext ? "0" : "1",
          transition: "all 0.5s ease",
          position: loadingContext ? "fixed" : "",
          top: loadingContext ? "-50%" : "",
          padding: "5px",
          overflow: "hidden",
          borderRadius: "4px",
        }}
        {...(true ? { timeout: props.index * 150 } : {})}
      >
        <ImageListItem
          key={props.item.image}
          style={{ overflow: "hidden", borderRadius: "4px" }}
        >
          <img
            src={src}
            srcSet={src}
            alt={props.item.caption}
            loading="lazy"
            style={{
              cursor: "pointer",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow:
                " rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              border: "1px solid #f7f7f7",
            }}
            onClick={() => props.handleOpenPoster(props.item)}
            onError={() => {
              setSrc(defaultImg);
            }}
            onLoad={() => {
              setLoadingContext(false);
            }}
          />
        </ImageListItem>
      </Grow>
    </>
  );
}
