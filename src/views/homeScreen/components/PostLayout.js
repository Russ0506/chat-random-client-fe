import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            alt={data.userNm}
            src={data.img}
            sx={{
              bgcolor: red[500],
              p: 0,
              background: "#817cce",
              backgroundColor: "#817cce",
            }}
          />
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={data.userNm}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.content}
        </Typography>
      </CardContent>
      <CardMedia component="img" image={data.img} alt="img" />

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
