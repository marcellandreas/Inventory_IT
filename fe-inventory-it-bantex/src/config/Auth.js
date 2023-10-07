import { AxiosInstance } from "../apis/api";

// token autentikasi dan role pengguna
const setAuthToken = (token, role, id_user, username_) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("id_user", id_user);
  localStorage.setItem("username", username_);

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

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
}

export { setAuthToken, signOut, getAuthHeaders };
