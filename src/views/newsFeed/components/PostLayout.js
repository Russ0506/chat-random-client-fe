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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Fade, Link } from "@mui/material";
import SmartClock from "../../../utils/smartClock";
import { axiosClient } from "../../../setup/axiosClient";

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
  const [reacted, setReacted] = React.useState(undefined);
  const isReacted = () => {
    if (reacted === undefined) return data.reacted_by_current_user;

    return reacted;
  };
  const noOfReactions = () => {
    let res = data?.no_of_reactions;
    if (data?.reacted_by_current_user) res -= 1;
    return isReacted() ? res + 1 : res;
  };
  const toggleReaction = async () => {
    await axiosClient.post(`/posts/${data.id}/toggle_react`);
    setReacted(!isReacted());
  };
  return (
    <Card
      sx={{
        maxWidth: { sm: 470, md: 800 },
        mb: "30px",
        // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        boxShadow: "0 1px 20px 0 rgb(69 90 100 / 8%)",
        width: "100%",
        borderRadius: "7px",
      }}
    >
      <CardHeader
        sx={{ p: 1.5 }}
        avatar={
          <Typography component={Link} href={`users/profile/${data.user.id}`}>
            <Avatar
              aria-label="recipe"
              alt="avatar"
              src={`api/${data.user.avatar_path}`}
              sx={{
                p: 0,
                background: "#817cce",
                backgroundColor: "#817cce",
                fontSize: "1rem",
              }}
            />
          </Typography>
        }
        title={
          <Typography
            component={Link}
            href={`users/profile/${data.user.id}`}
            variant="body2"
            underline="hover"
          >
            {data.user.name}
          </Typography>
        }
        subheader={<SmartClock date={data.created_at} />}
      />
      <CardContent sx={{ p: 1, pt: 0, pl: 1.5 }}>
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

      <CardActions disableSpacing sx={{p:1, pt: 0.5, pb: 0.5}}>
        <IconButton
          aria-label="add to favorites"
          onClick={toggleReaction}
          color={isReacted() ? "error" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography>{noOfReactions()}</Typography>
      </CardActions>
    </Card>
  );
}
