import {
  Button, IconButton, Stack, TextField, Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import React, { Component } from "react";
import { CmmnFormControl } from "../chat/popup/components/CmmnFormControl";
import { CmmnInputLabel } from "../chat/popup/components/CmmnInputLabel";
import AvatarFramEdit from "./components/AvatarFramEdit";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Loading from "../common/base/loading/Loading";
import StartBarCt from "../common/error/StackBarCt";

class ChangePwdCls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      openStb: false,
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      isSubmit: false,
    };
    this.handleSubmit = this.handleSubmit.bind();
    this.handleOpenStb = this.handleOpenStb.bind(this);
    this.handleCloseStb = this.handleCloseStb.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  initialValues = {
    newPass: "",
    oldPass: "",
    confirmPass: "",
  };

  ChangePassSchema = Yup.object().shape({
    oldPass: Yup.string().required("Old password is required"),
    newPass: Yup.string()
      .matches(
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?=*&]).{8,20})/,
        "Password have to be at least one lowercase, one upper case, one number and the special characters of (!,@,#,$,%,?,=,*,&), from 8 to 20 characters"
      )
      .required("Password Required"),
    confirmPass: Yup.string().when("newPass", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPass")],
        "Confirm password need to match your new password"
      ),
    }),
  });

  handleOpenStb = () => {
    this.setState({ openStb: true });
  };
  handleCloseStb = () => {
    this.setState({ openStb: false });
  };

  handleClickShowPassword(type) {
    if (type === "oldPass")
      this.setState({ showOldPassword: !this.state.showOldPassword });
    if (type === "newPass")
      this.setState({ showNewPassword: !this.state.showNewPassword });
    if (type === "confirmPass")
    this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
  }

  handleSubmit = (event) => {
    this.setState({
      isSubmit: true,
    });

    const params = {
      user: {
        old_password: event.oldPass,
        new_password: event.newPass,
        confirm_pass: event.confirmPass
      },
    };

    console.log(params);

    setTimeout(() => {
      this.setState({
        isSubmit: false,
      });
    }, 3000);

    // const formData = new FormData();
    // for (let param in params["user"]) {
    //   formData.append(`user[${param}]`, params["user"][param]);
    // }

    // axiosClient
    //   .post(`${URL}`, formData)
    //   .then((data) => {
    //     if (data.data.success) {
    //       console.log("success");
    //     }
    //   })
    //   .catch(
    //     function (error) {
    //       this.setState({ isSubmit: false });
    //       this.setState({ message: error.response.data.error || error.response.data.errors[0] });
    //       this.handleOpenStb();
    //       return Promise.reject(error);
    //     }.bind(this)
    //   );
  }

  render() {

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
          typeNoti="error"
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

          <Formik
            initialValues={this.initialValues}
            validationSchema={this.ChangePassSchema}
            onSubmit={this.handleSubmit}
            sx={{
              width: { xs: "100%", sm: "calc(100% - 200px)" },
              overflow: "auto",
              pl: 2,
              pr: 2,
            }}
          >
            {({ errors, touched }) => (
              <Form >
                <Stack flexDirection="column"
                >
                  <CmmnFormControl
                    variant="standard"
                    fullWidth
                    sx={{ maxWidth: "500px" }}
                  >
                    <CmmnInputLabel shrink htmlFor="curr-pwd-inpt">
                      Current Password
                    </CmmnInputLabel>
                    <Field as={TextField}
                      id="curr-pwd-inpt"
                      type={
                        this.state.showOldPassword ? "text" : "password"
                      }
                      name="oldPass"
                      helperText={
                        <ErrorMessage
                          className="error-text"
                          name="oldPass"
                        />
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                this.handleClickShowPassword(
                                  "oldPass"
                                )
                              }
                              onMouseDown={() =>
                                this.handleClickShowPassword(
                                  "oldPass"
                                )
                              }
                            >
                              {this.state.showOldPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </CmmnFormControl>
                  <CmmnFormControl
                    variant="outline"
                    sx={{ maxWidth: "500px" }}
                  >
                    <CmmnInputLabel shrink htmlFor="new-pwd-inpt">
                      New Password
                    </CmmnInputLabel>
                    <Field as={TextField}
                      id="new-pwd-inpt"
                      type={
                        this.state.showNewPassword ? "text" : "password"
                      }
                      name="newPass"
                      helperText={
                        <ErrorMessage
                          className="error-text"
                          name="newPass"
                        />
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                this.handleClickShowPassword(
                                  "newPass"
                                )
                              }
                              onMouseDown={() =>
                                this.handleClickShowPassword(
                                  "newPass"
                                )
                              }
                            >
                              {this.state.showNewPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </CmmnFormControl>
                  <CmmnFormControl
                    variant="outline"
                    sx={{ maxWidth: "500px" }}
                  >
                    <CmmnInputLabel shrink htmlFor="re-new-pwd-inpt">
                      Confirm New Password
                    </CmmnInputLabel>
                    <Field as={TextField}
                      id="re-new-pwd-inpt"
                      type={
                        this.state.showConfirmPassword ? "text" : "password"
                      }
                      name="confirmPass"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                this.handleClickShowPassword(
                                  "confirmPass"
                                )
                              }
                              onMouseDown={() =>
                                this.handleClickShowPassword(
                                  "confirmPass"
                                )
                              }
                            >
                              {this.state.showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                  </CmmnFormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                      p: "10px 25px",
                      margin: "25px 0 40px 0",
                      justifySelf: "flex-end",
                      alignSelf: "flex-start",
                      borderRadius: "5px",
                    }}
                    disabled= {this.state.isSubmit}
                  >
                    Change Password
                  </Button>
                </Stack>
              </Form>)}
          </Formik>
        </Stack>
      </Box>
    );
  }
}
export default function ChangePwd() {
  const theme = useTheme();
  return <ChangePwdCls theme={theme} />;
}
