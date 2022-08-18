import {
  Button,
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Stack,
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
import AvatarFramEdit from "./components/AvatarFramEdit";
import { axiosClient, axiosMultipartForm } from "../../setup/axiosClient";
import StartBarCt from "../common/error/StackBarCt";
import Loading from "../common/base/loading/Loading";
import CONSTANT from "../../constant/constant"
const URL = "users";
class EditProfileCls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        address: null,
        age: null,
        avatar_path: null,
        birthday: null,
        email: null,
        first_name: null,
        gender: null,
        hobbies: [],
        id: null,
        is_online: false,
        last_name: null
      },
      isSubmit: false,
      message: null,
      openStb: false,
      typeNoti: "error"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenStb = this.handleOpenStb.bind(this);
    this.handleCloseStb = this.handleCloseStb.bind(this);
  }

  componentDidMount() {
    axiosClient.get(`/users/${localStorage.getItem("user_id")}`).then((data) => {
      this.setState({
        userData: data
      })
    }).catch((error) => { console.log(error); });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isSubmit: "true",
    });
    const data = new FormData(event.currentTarget);
    const params = {
      user: {
        first_name: data.get('first_name'),
        last_name: data.get('last_name'),
        gender: data.get('gender'),
        hobbies: this.state.userData.hobbies
      },
    };

    const formData = new FormData();
    for (let param in params["user"]) {
      formData.append(`user[${param}]`, params["user"][param]);
    }

    axiosMultipartForm
      .patch(`${URL}/`+localStorage.getItem('user_id'), formData)
      .then((data) => {
        if (data.data.success) {
          this.setState({message: "Success"})
          this.setState({
            typeNoti: "success"
          })
        }
      })
      .catch(
        function (error) {
          this.setState({ isSubmit: false });
          this.setState({ message: error.response.data.error || error.response.data.errors[0] });
          this.handleOpenStb();
          return Promise.reject(error);
        }.bind(this)
      );
  }

  handleOpenStb = () => {
    this.setState({ openStb: true });
  };
  handleCloseStb = () => {
    this.setState({ openStb: false });
  };

  handleChangeHobby = (event) => {
    let {
      target: { value },
    } = event;
    this.setState({
      userData: {
        ...this.state.userData, hobbies: typeof value === "string" ? value.split(",") : value
      }
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
        <StartBarCt
          openStb={this.state.openStb}
          closeStb={this.handleCloseStb}
          titleStb={this.state.message}
          typeNoti={this.state.typeNoti}
        ></StartBarCt>
        <Loading show={this.state.isSubmit}></Loading>
        <Stack
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "flex-start" }}
          sx={{ width: "100%", height: { xs: "auto", sm: "100%" }, p: 2 }}
        >
          <Stack
            flexDirection="column"
            alignItems="center"
            sx={{
              width: { xs: "100%", sm: "200px" },
              height: "100%",
              pt: { xs: 0, sm: 2 },
            }}
          >
            <AvatarFramEdit
              img={this.state.userData.avatar_path}
              sx={{ width: "100px", height: "100px", position: "relative" }}
            />

            <Typography
              variant="body1"
              sx={{ mt: 1, color: "#4f4f4f", justifySelf: "flex-end" }}
            >
              {this.state.userData.name}
            </Typography>
          </Stack>
          <Stack
            component="form" noValidate onSubmit={this.handleSubmit}
            flexDirection="column"
            sx={{
              width: { xs: "100%", sm: "calc(100% - 200px)" },
              overflow: "auto",
              pl: 2,
              pr: 2,
            }}
          >
            <CmmnFormControl
              variant="standard"
              sx={{ maxWidth: "500px" }}
            >
              <CmmnInputLabel shrink htmlFor="last-nm-inpt">
                Last Name
              </CmmnInputLabel>
              <CmmnInput
                id="last-nm-inpt"
                type="text"
                name="last_name"
                value={this.state.userData.last_name || null}
                onChange={(event) => {
                  this.setState({
                    userData: {
                      ...this.state.userData, last_name: event.currentTarget.value
                    }
                  })
                }}
              />
            </CmmnFormControl>
            <CmmnFormControl
              variant="standard"
              sx={{ maxWidth: "500px" }}
            >
              <CmmnInputLabel shrink htmlFor="first-nm-inpt">
                First Name
              </CmmnInputLabel>
              <CmmnInput
                id="first-nm-inpt"
                type="text"
                name="first_name"
                value={this.state.userData.first_name || null}
                onChange={(event) => {
                  this.setState({
                    userData: {
                      ...this.state.userData, first_name: event.currentTarget.value
                    }
                  })
                }}
              />
            </CmmnFormControl>
            <CmmnFormControl
              variant="standard"
              sx={{ maxWidth: "500px" }}
            >
              <CmmnInputLabel shrink htmlFor="email-inpt">
                Email
              </CmmnInputLabel>
              <CmmnInput
                id="email-inpt"
                type="text"
                name="email"
                value={this.state.userData.email || null}
                disabled
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
                  value={this.state.userData.gender}
                  onChange={(event) => {
                    this.setState({
                      userData: {
                        ...this.state.userData, gender: event.target.value
                      }
                    })
                  }}
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
                Birthday
              </CmmnInputLabel>
              <CmmnInput
                id="age-inpt"
                type="date"
                name="age"
                disabled
                value={this.state.userData.birthday}
                sx={{ width: "150px" }}
              />
            </CmmnFormControl>
            <Stack sx={{ mt: "15px", maxWidth: "500px" }}>
              <CmmnInputLabel shrink htmlFor="demo-multiple-chip">
                Hobbies
              </CmmnInputLabel>
              <CmmnFormControl
                variant="outlined"
                sx={{
                  boxShadow: "none",
                  // outline: "none",
                  mt: "0 !important",
                  pt: "0 !important",
                }}
              >
                <CmmnGroupSelect
                  name="hobbies"
                  size="small"
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={this.state.userData.hobbies}
                  onChange={this.handleChangeHobby}
                  input={<OutlinedInput id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {CONSTANT.HobbiesNames.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, this.state.userData.hobbies, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </CmmnGroupSelect>
              </CmmnFormControl>
              <Button
                type="submit"
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
        </Stack>
      </Box>
    );
  }
}

export default function EditProfile() {
  const theme = useTheme();
  return <EditProfileCls theme={theme} />;
}
