import {
  Button,
  Chip,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  OutlinedInput,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled } from "@mui/styles";
import MenuPreProfile from "../profile/components/MenuPreProfile";
import { CmmnInput } from "../chat/popup/components/CmmnInput";
import { CmmnFormControl } from "../chat/popup/components/CmmnFormControl";
import { CmmnInputLabel } from "../chat/popup/components/CmmnInputLabel";
import { CmmnSelect } from "../chat/popup/components/CmmnSelect";
import { CmmnGroupSelect } from "../chat/popup/components/CmmnGroupSelect";
import { useTheme } from "@mui/material/styles";
class ChangePwdCls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hobbies: this.props.hobbies == null ? [] : this.props.hobbies,
    };
  }

  handleChangeHobby = (event) => {
    let {
      target: { value },
    } = event;
    this.setState({
      // On autofill we get a stringified value.
      ...this.state,
      hobbies: typeof value === "string" ? value.split(",") : value,
    });
  };
  render() {
    // Get it from props
    const { theme } = this.props;

    function getStyles(name, selectName, theme) {
      return {
        fontWeight:
          selectName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          // p: 2,
          pt: 2,
          background: "#fff",
        }}
      >
        <Grid
          container
          columns={{ xs: 1, sm: 1, md: 1, lg: 2 }}
          sx={{ width: "100%", height: "100%", p: 2 }}
        >
          <Stack
            flexDirection="column"
            alignItems="center"
            // justifyContent="center"
            sx={{ width: "200px", height: "100%" }}
          >
            <Box
              sx={{
                width: "125px",
                height: "125px",
                background: "gray",
                borderRadius: "50%",
              }}
            ></Box>
            <Typography
              variant="body1"
              sx={{ mt: 1, color: "#4f4f4f", justifySelf: "flex-end" }}
            >
              Tuong Vy Bui Anh
            </Typography>
          </Stack>

          <Stack
            flexDirection="column"
            sx={{
              width: "calc(100% - 200px)",
              overflow: "auto",
              pl: 2,
              pr: 2,
            }}
          >
            <CmmnFormControl
              variant="standard"
              fullWidth
              sx={{ maxWidth: "500px" }}
            >
              <CmmnInputLabel shrink htmlFor="curr-pwd-inpt">
                Current Password
              </CmmnInputLabel>
              <CmmnInput
                id="curr-pwd-inpt"
                type="password"
                name="currPwd"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CmmnFormControl>
            <CmmnFormControl
              variant="standard"
              fullwidth
              sx={{ maxWidth: "500px" }}
            >
              <CmmnInputLabel shrink htmlFor="new-pwd-inpt">
                New Password
              </CmmnInputLabel>
              <CmmnInput
                id="new-pwd-inpt"
                type="password"
                name="newPwd"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CmmnFormControl>
            <CmmnFormControl
              variant="standard"
              fullwidth
              sx={{ maxWidth: "500px" }}
            >
              <CmmnInputLabel shrink htmlFor="re-new-pwd-inpt">
                Confirm New Password
              </CmmnInputLabel>
              <CmmnInput
                id="re-new-pwd-inpt"
                type="password"
                name="reNewPwd"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CmmnFormControl>
            <Button
              variant="contained"
              sx={{
                pl: "25px",
                pr: "25px",
                margin: "25px 0 40px 0",
                width: "150px",
                justifySelf: "flex-end",
                alignSelf: "flex-start",
                borderRadius: "20px",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Grid>
      </Box>
    );
  }
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Camping",
  "Read Book",
  "Climb",
  "Sport",
  "Music",
  "Foodt",
  "Forest",
  "Ocean",
  "Animal",
  "Romantic",
];

export default function ChangePwd() {
  const theme = useTheme();
  return <ChangePwdCls theme={theme} />;
}
