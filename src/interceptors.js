// import axios from "axios";
// import { createHashHistory } from "history";

// const history = createHashHistory();
// const loadingState = {
//   loading: false,
// };

// const Interceptors = (store) => {
//   axios.interceptors.request.use(
//     (config) => {
//       store.dispatch({ type: "LOADING" });

//       const token = sessionStorage.getItem("token");
//       const userId = sessionStorage.getItem("USER_ID");
//       const grpId = sessionStorage.getItem("GRP_ID");

//       if (token) {
//         config.headers["Authorization"] = "Bearer " + token;
//         config.headers["UserId"] = userId;
//         config.headers["GrpId"] = grpId;
//       }

//       return config;
//     },
//     (error) => {
//       Promise.reject(error);
//     }
//   );

//   axios.interceptors.response.use(
//     (response) => {
//       store.dispatch({ type: "SUCCESS" });

//       return response;
//     },
//     (error) => {
//       store.dispatch({ type: "SUCCESS" });

//       if (error.response === undefined && error.status === undefined) {
//         alert("서버와 통신이 실패하였습니다.");
//       } else if (401 === error.response.status) {
//         sessionStorage.clear();
//         alert("ID 또는 비밀번호를 확인하세요.");

//         return Promise.reject(error);
//       } else if (403 === error.response.status) {
//         sessionStorage.clear();
//         alert("로그인 만료되었습니다.");

//         history.push("/login");

//         return Promise.reject(error);
//       } else if (500 === error.response.status) {
//         alert("서버에서 요청을 수행할 수 없습니다.");
//       } else if (504 === error.response.status) {
//         alert("서버 요청 시간을 초과하였습니다.");
//       } else {
//         alert("오류가 발생하였습니다.");
//       }
//     }
//   );
// };

// export default Interceptors;
