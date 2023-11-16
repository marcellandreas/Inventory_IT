import { useEffect } from "react";
import { AxiosInstance } from "../apis/api";

// token autentikasi dan role pengguna
const setAuthToken = (token) => {
  localStorage.setItem("token", token);

  // Mengatur token autentikasi dalam header permintaan
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

const signOut = () => {
  // Menghapus token autentikasi dan role dari cookie
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("id_user");

  // Menghapus token autentikasi dari header permintaan
  delete AxiosInstance.defaults.headers.common["Authorization"];
};

// useEffect(() => {
//   const timeoutId = setTimeout(() => {
//     signOut();
//   }, 60 * 60 * 1000);

//   return () => clearTimeout(timeoutId);
// }, []);

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
}

export { setAuthToken, signOut, getAuthHeaders };
