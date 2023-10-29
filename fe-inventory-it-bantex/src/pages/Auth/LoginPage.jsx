import AuthTemp from "../../components/templates/Auth";
import { useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { setAuthToken } from "../../config/Auth";
import FormLogin from "../../components/molecules/Form/Auth/FormLogin";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        throw new Error("Username dan password harus diisi");
      }

      const response = await AxiosInstance.post("/auth/login", {
        username,
        password,
      });

      const token = response.data.data.token;
      const role = response.data.data.role;
      const id_user = response.data.data.id_user;
      const username_ = response.data.data.username;

      if (response.data.data.username) {
        await AxiosInstance.post("auth/recordlogin", {
          username: username_,
        });
      }
      // Set token autentikasi
      setAuthToken(token);

      localStorage.setItem("role", role);
      localStorage.setItem("id_user", id_user);
      localStorage.setItem("username", username_);
      console.log(response);
      // Refresh Token
      if (token) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthTemp>
      <FormLogin
        setPassword={setPassword}
        setUsername={setUsername}
        show={show}
        handleLogin={handleLogin}
        handleShow={handleShow}
      ></FormLogin>
    </AuthTemp>
  );
};

export default LoginPage;
