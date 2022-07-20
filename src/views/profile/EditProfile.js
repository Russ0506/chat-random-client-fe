import {
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  Input,
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
import { CmmnSelect } from "../chat/popup/components/CmmnSelect";
import { CmmnGroupSelect } from "../chat/popup/components/CmmnGroupSelect";
import { useTheme } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AvatarFramEdit from "./components/AvatarFramEdit";
class EditProfileCls extends Component {
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
    const avatar_path = localStorage.getItem('avatar_path');
    const user_display_name= localStorage.getItem('user_display_name');

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
        <Grid
          container
          columns={{ xs: 1, sm: 1, md: 1, lg: 2 }}
          sx={{ width: "100%", height: "100%", p: 2 }}
        >
          <Stack
            flexDirection="column"
            alignItems="center"
            sx={{ width: "200px", height: "100%" }}
          >
            <AvatarFramEdit
              img={avatar_path}
              sx={{ width: "100px", height: "100px", position: "relative" }}
            />

            <Typography
              variant="body1"
              sx={{ mt: 1, color: "#4f4f4f", justifySelf: "flex-end" }}
            >
              {user_display_name}
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
              // // fullWidth
              sx={{ maxWidth: "500px" }}
            >
              <CmmnInputLabel shrink htmlFor="last-nm-inpt">
                Last Name
              </CmmnInputLabel>
              <CmmnInput
                id="last-nm-inpt"
                type="text"
                name="lastNm"
                defaultValue="Bui Anh"
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
            </CmmnFormControl>
            <CmmnFormControl
              variant="standard"
              // // fullWidth
              sx={{ maxWidth: "500px" }}
            >
              <CmmnInputLabel shrink htmlFor="first-nm-inpt">
                First Name
              </CmmnInputLabel>
              <CmmnInput
                id="first-nm-inpt"
                type="text"
                name="firstNm"
                defaultValue="Tuong Vy"
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
            </CmmnFormControl>
            <CmmnFormControl
              variant="standard"
              // fullWidth
              sx={{ maxWidth: "500px" }}
            >
              <CmmnInputLabel shrink htmlFor="email-inpt">
                Email
              </CmmnInputLabel>
              <CmmnInput
                id="email-inpt"
                type="text"
                name="email"
                defaultValue="VyBAT@fsoft.com.vn"
                disabled
                // InputLabelProps={{
                //   shrink: true,
                // }}
              />
            </CmmnFormControl>
            <Stack sx={{ mt: "15px", maxWidth: "500px" }}>
              <CmmnInputLabel shrink htmlFor="gender-inpt">
                Gender
              </CmmnInputLabel>
              <FormControl
                className="__fc__gender"
                variant="standard"
                sx={{ width: "150px" }}
              >
                <CmmnSelect
                  id="gender-inpt"
                  name="gender"
                  defaultValue="male"
                  sx={{ border: "1px solid #e5e0e0", boxShadow: "none" }}
                >
                  <MenuItem key="1" value="male">
                    Male
                  </MenuItem>
                  <MenuItem key="2" value="female">
                    Female
                  </MenuItem>
                  <MenuItem key="3" value="others">
                    <em>Others</em>
                  </MenuItem>
                </CmmnSelect>
              </FormControl>
            </Stack>
            <CmmnFormControl
              variant="standard"
              // fullWidth
              sx={{ maxWidth: "500px" }}
            >
              <CmmnInputLabel shrink htmlFor="age-inpt">
                Age
              </CmmnInputLabel>
              <CmmnInput
                id="age-inpt"
                type="number"
                name="age"
                defaultValue="22"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                sx={{ width: "150px" }}
              />
            </CmmnFormControl>
            <Stack sx={{ mt: "15px", maxWidth: "500px" }}>
              <CmmnInputLabel shrink htmlFor="demo-multiple-chip">
                Hobbies
              </CmmnInputLabel>
              <CmmnFormControl
                variant="outlined"
                sx={{ boxShadow: "none", outline: "none", mt: "0 !important" }}
              >
                <CmmnGroupSelect
                  size="small"
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={this.state.hobbies}
                  onChange={this.handleChangeHobby}
                  input={<OutlinedInput id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, this.state.hobbies, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </CmmnGroupSelect>
              </CmmnFormControl>
              <Button
                variant="contained"
                size="small"
                sx={{
                  p: "9px 18px",
                  margin: "25px 0 40px 0",
                  width: "150px",
                  borderRadius: "5px",
                }}
              >
                Submit
              </Button>
            </Stack>
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

export default function EditProfile() {
  const theme = useTheme();
  return <EditProfileCls theme={theme} />;
}
