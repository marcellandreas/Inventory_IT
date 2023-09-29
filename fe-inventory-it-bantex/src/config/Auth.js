import { AxiosInstance } from "../apis/api";

// token autentikasi dan role pengguna
const setAuthToken = (token, role, username_) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("username", username_);
  console.log(token);

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

  // Menghapus token autentikasi dari header permintaan
  delete AxiosInstance.defaults.headers.common["Authorization"];
};

export { setAuthToken, signOut };
