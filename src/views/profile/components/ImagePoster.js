import { Grow, ImageListItem, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import errImg from "../components/img/errImg.png";
const defaultImg = errImg;
export default function ImagePoster(props) {
  const [loadingContext, setLoadingContext] = useState(true);
  const [src, setSrc] = useState(props.item.image_path);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "164px",
          padding: "5px",
          borderRadius: "4px",
          display: loadingContext ? "" : "none",
        }}
      >
        <Grow
          key={props.index}
          in={true}
          style={{ transformOrigin: "0 0 0 0" }}
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
          display: loadingContext ? "none" : "",
          transition: "all 1s ease",
          padding: "5px",
        }}
        {...(true ? { timeout: props.index * 150 } : {})}
      >
        <ImageListItem key={props.item.image}>
          <img
            src={src}
            srcSet={src}
            alt={props.item.caption}
            // loading="lazy"
            style={{
              cursor: "pointer",
              borderRadius: "4px",

              boxShadow:
                " rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
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
