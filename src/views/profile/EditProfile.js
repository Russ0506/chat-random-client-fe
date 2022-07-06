import {
  Button,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import { DRAWER_WITH } from "../../constant/css_constant";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled } from "@mui/styles";
import MenuPreProfile from "../profile/components/MenuPreProfile";
import { CmmnInput } from "../chat/popup/components/CmmnInput";
import { CmmnFormControl } from "../chat/popup/components/CmmnFormControl";
import { CmmnInputLabel } from "../chat/popup/components/CmmnInputLabel";
import { CmmnSelect } from "../chat/popup/components/CmmnSelect";
export default class EditProfile extends Component {
  render() {
    return (
      <Box sx={{ width: "100%", height: "100%", p: 2 }}>
        {/* <Box className="profile-edt-title">
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            My Profile
          </Typography>
        </Box> */}
        <Grid
          container
          columns={{ xs: 1, sm: 2, md: 2 }}
        >
          <Stack
            flexDirection="column"
            alignItems="center"
            // justifyContent="center"
            sx={{ width: "200px" }}
          >
            <Box
              sx={{
                width: "125px",
                height: "125px",
                background: "black",
                borderRadius: "50%",
              }}
            ></Box>
            <Button
              variant="contained"
              sx={{ pl: "25px", pr: "25px", margin: "20px 0" }}
            >
              Change Picture
            </Button>
          </Stack>

          <Stack
            flexDirection="column"
            sx={{
              width: "calc(100% - 200px)",
              padding: "0 5%"
            }}
          >
            <CmmnFormControl variant="standard" fullWidth>
              <CmmnInputLabel shrink htmlFor="last-nm-inpt">
                Last Name
              </CmmnInputLabel>
              <CmmnInput
                id="last-nm-inpt"
                type="text"
                name="lastNm"
                defaultValue="Bui Anh"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CmmnFormControl>
            <CmmnFormControl variant="standard" fullWidth>
              <CmmnInputLabel shrink htmlFor="first-nm-inpt">
                First Name
              </CmmnInputLabel>
              <CmmnInput
                id="first-nm-inpt"
                type="text"
                name="firstNm"
                defaultValue="Tuong Vy"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CmmnFormControl>
            <CmmnFormControl variant="standard" fullWidth>
              <CmmnInputLabel shrink htmlFor="email-inpt">
                Email
              </CmmnInputLabel>
              <CmmnInput
                id="email-inpt"
                type="text"
                name="email"
                defaultValue="VyBAT@fsoft.com.vn"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </CmmnFormControl>
            <Stack sx={{ mt: "15px" }}>
              <CmmnInputLabel shrink htmlFor="gender-inpt">
                Gender
              </CmmnInputLabel>
              <FormControl variant="standard" sx={{ width: "30%" }}>
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
            <CmmnFormControl variant="standard" fullWidth>
              <CmmnInputLabel shrink htmlFor="age-inpt">
                Email
              </CmmnInputLabel>
              <CmmnInput
                id="age-inpt"
                type="number"
                name="age"
                defaultValue="22"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ width: "150px" }}
              />
            </CmmnFormControl>
            <Stack flexDirection="column" sx={{ width: "100%" }}>
              <CmmnInputLabel shrink htmlFor="hobies-inpt">
                Hobies
              </CmmnInputLabel>
              <CmmnFormControl variant="standard" fullWidth>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={6}
                  placeholder="Fill your hobies into here"
                  style={{
                    padding: "10px",
                    width: "100%",
                    border: "1px solid #e5e0e0",
                    borderRadius: "10px",
                  }}
                />
              </CmmnFormControl>
            </Stack>
          </Stack>
        </Grid>
      </Box>
    );
  }
}
