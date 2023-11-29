import { AxiosInstance } from "../apis/api";

let tokenTimeout;

const setAuthToken = (token) => {
  // Hapus timeout sebelumnya jika ada
  if (tokenTimeout) {
    clearTimeout(tokenTimeout);
  }

  localStorage.setItem("token", token);

  // Mengatur token autentikasi dalam header permintaan
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Set timeout untuk logout setelah 10 detik (untuk uji coba)
    tokenTimeout = setTimeout(() => {
      console.log("Logout setelah 10 detik");
      signOut();
    }, 10000); // 10 detik dalam milidetik
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

const signOut = () => {
  // Menghapus token autentikasi dan role dari localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("id_user");

  // Menghapus token autentikasi dari header permintaan
  delete AxiosInstance.defaults.headers.common["Authorization"];

  // Hapus timeout jika logout manual
  if (tokenTimeout) {
    clearTimeout(tokenTimeout);
  }
  console.log("Logout berhasil");
};

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
}

export { setAuthToken, signOut, getAuthHeaders };
