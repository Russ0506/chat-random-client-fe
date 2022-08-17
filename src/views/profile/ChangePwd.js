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
import { CmmnInput } from "../chat/popup/components/CmmnInput";
import { CmmnFormControl } from "../chat/popup/components/CmmnFormControl";
import { CmmnInputLabel } from "../chat/popup/components/CmmnInputLabel";
import { useTheme } from "@mui/material/styles";
import AvatarFramEdit from "./components/AvatarFramEdit";
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
          pt: 2,
          background: "#fff",
        }}
      >
        <Stack
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          sx={{ width: "100%", height: { xs: "auto", md: "100%" }, p: 2 }}
        >
          <Stack
            flexDirection="column"
            alignItems="center"
            sx={{ width: { xs: "100%", md: "200px" }, height: "100%" }}
          >
            <AvatarFramEdit
              img={null}
              sx={{ width: "100px", height: "100px", position: "relative" }}
            />
            <Typography
              variant="body1"
              sx={{ mt: 1, color: "#4f4f4f", justifySelf: "flex-end" }}
            >
              {localStorage.getItem("user_display_name")}
            </Typography>
          </Stack>
          <Stack
            flexDirection="column"
            sx={{
              width: { xs: "100%", md: "calc(100% - 200px)" },
              overflow: "auto",
              pl: 2,
              pr: 2,
              pt: { xs: 3, md: 6 },
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
              // fullWidth
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
              // fullWidth
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
              size="small"
              sx={{
                p: "10px 25px",
                margin: "25px 0 40px 0",
                justifySelf: "flex-end",
                alignSelf: "flex-start",
                borderRadius: "5px",
              }}
            >
              Change Password
            </Button>
          </Stack>
        </Stack>
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
