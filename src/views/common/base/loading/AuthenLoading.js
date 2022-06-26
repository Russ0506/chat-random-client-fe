import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user_verify } from "../../../../features/auth";
import {
  authenRouteOneTime,
  authenRoute,
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
          navigate("/app");
        } else if (res.logged_in && authenRoute.includes(props.link)) {
          setIsAccess(true);
        } else {
          navigate("/users/login");
          setIsAccess(true);
        }
      })
      .catch(() => {});
  }, [isAccess, dispatch, navigate, props.link ]);

  let disPlayModal = "";
  return isAccess == true ? (
   props.children
  ) : (
    <Box
      sx={{
        width: "300px",
        height: "100px",
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
