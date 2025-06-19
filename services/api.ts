import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BASE,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
  withCredentials: true,
});

// Tambahkan token ke setiap request jika tersedia
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // console.log(`Bearer ${token}`);
  }
  return config;
});

// Tangani response error, khususnya 401 (Unauthorized)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("Token expired, redirecting to login...");

//       Cookies.remove("id_user");
//       Cookies.remove("username");
//       Cookies.remove("token");

//       // window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
