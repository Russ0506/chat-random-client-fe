import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import NewPosterLayout from "./components/NewPosterLayout";
import $ from "jquery";
import { Link } from "react-router-dom";


const shapeStyles = {
  bgcolor: "primary.main",
  width: 150,
  height: 150,
  marginTop: 1,
};
const shapeCircleStyles = { borderRadius: "50%" };
const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);

const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "300px",
  boxShadow: "none",
  backgroundColor: "gray",
  minWidth: "250px"
}));

export default function UserProfile() {
  useEffect(() => {
    var canvas = $("canvas")[0];
    var context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var Dots = [];
    var colors = ["#FF9900", "#424242", "#BCBCBC", "#3299BB"];
    var maximum = 70;

    function Initialize() {
      GenerateDots();

      Update();
    }

    function Dot() {
      this.active = true;

      this.diameter = Math.random() * 7;

      this.x = Math.round(Math.random() * canvas.width);
      this.y = Math.round(Math.random() * canvas.height);

      this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7,
        y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.7,
      };

      this.alpha = 0.1;
      this.hex = colors[Math.round(Math.random() * 3)];
      this.color = HexToRGBA(this.hex, this.alpha);
    }

    Dot.prototype = {
      Update: function () {
        if (this.alpha < 0.8) {
          this.alpha += 0.01;
          this.color = HexToRGBA(this.hex, this.alpha);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (
          this.x > canvas.width + 5 ||
          this.x < 0 - 5 ||
          this.y > canvas.height + 5 ||
          this.y < 0 - 5
        ) {
          this.active = false;
        }
      },

      Draw: function () {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2, false);
        context.fill();
      },
    };

    function Update() {
      GenerateDots();

      Dots.forEach(function (Dot) {
        Dot.Update();
      });

      Dots = Dots.filter(function (Dot) {
        return Dot.active;
      });

      Render();
      requestAnimationFrame(Update);
    }

    function Render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      Dots.forEach(function (Dot) {
        Dot.Draw();
      });
    }

    function GenerateDots() {
      if (Dots.length < maximum) {
        for (var i = Dots.length; i < maximum; i++) {
          Dots.push(new Dot());
        }
      }

      return false;
    }

    function HexToRGBA(hex, alpha) {
      var red = parseInt(TrimHex(hex).substring(0, 2), 16);
      var green = parseInt(TrimHex(hex).substring(2, 4), 16);
      var blue = parseInt(TrimHex(hex).substring(4, 6), 16);

      return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    }

    function TrimHex(hex) {
      return hex.charAt(0) == "#" ? hex.substring(1, 7) : 0;
    }

    $(window).resize(function () {
      Dots = [];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    Initialize();
  }, [])
  
  return (
    <>
      <canvas
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      ></canvas>
      <Stack alignItems="center" sx={{ width: "100%" }}>
        <Box
          sx={{
            // width: "55%",
            maxWidth: "1000px",
            minWidth: "320px",
            backgroundColor: "#fff",
            minHeight: "100vh",
            padding: "40px",
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={{
              width: "100%",
            }}
          >
            <Badge>{circle}</Badge>
            <Box sx={{ ml: 10 }}>
              <Typography variant="h5">
               Tuong Vy Bui Anh 
                <Button
                  component={Link}
                  to={"/users/profile/edit"}
                  variant="outlined"
                  size="small"
                  sx={{ ml: 1, mb: 1 }}
                >
                  Edit profile
                </Button>
              </Typography>
              <Stack flexDirection="column" flexWrap="wrap" sx={{ mt: 2 }}>
                <Typography variant="body1">Gender: Male</Typography>
                <Typography variant="body1">Hobies: Tinder</Typography>
                <Typography variant="body1">
                  Location: Cam Le, Danang, Viet Nam
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Divider
            variant="middle"
            sx={{ width: "100%", mt: 5, mb: 2, ml: 0, mr: 0 }}
          />
          <Grid
            sx={{ width: "100%" }}
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <NewPosterLayout />
            </Grid>
            <Grid item xs={4}>
              <Item>2</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>3</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>4</Item>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
