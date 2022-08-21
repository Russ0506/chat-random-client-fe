import { useEffect } from "react";
import Loading from "../common/base/loading/Loading";
import authService from "../../service/auth.service";

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    authService.logout().then(() => window.location.replace("/users/login"));
  }, []);

  return <Loading show={true} />;
};

export default Logout;
