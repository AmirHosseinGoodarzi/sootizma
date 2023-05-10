// import axios from "axios";
// import Swal from "sweetalert2";
// import { BASEURL } from "./Constants";

// const client = axios.create({
//   baseURL: BASEURL,
// });
// client.interceptors.request.use(
//   (config: any) => {
//     // Do something before request is sent
//     const _adminAuthToken = localStorage.getItem("_adminAuthToken");
//     if (_adminAuthToken) {
//       config.headers.Authorization = "bearer " + _adminAuthToken;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// client.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     Swal.fire({
//       icon: "error",
//       text: error.message,
//     });
//     return Promise.reject(error);
//   }
// );

// export default client;
