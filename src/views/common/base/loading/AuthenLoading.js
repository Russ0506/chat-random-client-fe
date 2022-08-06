import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user_verify } from "../../../../features/auth";
import {
  authenRouteOneTime,
  authenRoute,
  authenFailButStillCanAccess,
} from "../../../../constant/RouterPermission";
import Homepage from "../../../Homepage";
export default function AuthenLoading(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAccess, setIsAccess] = React.useState(false);

  useEffect(() => {
    dispatch(user_verify())
      .unwrap()
      .then((res) => {
        if (res.logged_in && authenRouteOneTime.includes(props.link)) {
          setIsAccess(true);
          navigate("/homepage");
        } else if (res.logged_in && authenRoute.includes(props.link)) {
          setIsAccess(true);
        } else if (
          !res.logged_in &&
          authenFailButStillCanAccess.includes(props.link)
        ) {
          setIsAccess(true);
        } else {
          setIsAccess(true);
          navigate("/users/login");
        }
      })
      .catch(() => {});
  }, [isAccess, dispatch, navigate, props.link]);

  let disPlayModal = "";
  return isAccess == true ? (
    props.children
  ) : (
    <Box
      sx={{
        overflow: "unset",
        display: disPlayModal,
      }}
      className="lds-ring"
    >
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
    </Box>
  );
}
