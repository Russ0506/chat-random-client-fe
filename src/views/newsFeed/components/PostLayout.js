import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Fade } from "@mui/material";
import SmartClock from "../../../utils/smartClock";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostLayout({ data }) {

  return (
    <Card
      sx={{
        maxWidth: { sm: 400, md: 800 },
        mb: "30px",
        // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        boxShadow: "0 1px 20px 0 rgb(69 90 100 / 8%)",
        width: "100%",
        borderRadius:"7px"
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            alt="avatar"
            src={`api/${data.user.avatar_path}`}
            sx={{
              bgcolor: red[500],
              p: 0,
              background: "#817cce",
              backgroundColor: "#817cce",
            }}
          />
        }
        title={data.user.name}
        subheader={<SmartClock date={data.created_at} />}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.caption}
        </Typography>
      </CardContent>
      <Fade in={true}>
        <CardMedia
          component="img"
          image={`api/${data.image_path}`}
          alt="img"
          width="100%"
          loading="lazy"
        />
      </Fade>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
