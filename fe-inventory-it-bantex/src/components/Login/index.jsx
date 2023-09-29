import { useState } from "react";
import { AxiosInstance } from "../../apis/api";
import { setAuthToken } from "../../config/Auth";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await AxiosInstance.post("/api/users/login", {
        username: username,
        password: password,
      });
      const token = response.data.data.accessToken;
      const role = response.data.data.role;
      const username_ = response.data.data.username;
      // Set token autentikasi
      setAuthToken(token, role, username_);
      // Refresh Token
      // await setRefreshToken();
      if (token) {
        window.location.href = "/";
      }
      // redirect
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin2 = async () => {
    await AxiosInstance.post("/api/users/login", {
      username: username,
      password: password,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="flex flex-col gap-5 w-80 justify-center items-center bg-slate-300 p-5 rounded-xl ">
      <h1 className="a text-3xl font-medium text-slate-900 uppercase">
        Inventory IT
      </h1>
      <div className="flex gap-3 flex-col w-full ">
        <label className="text-lg font-semibold">Username</label>
        <input
          type="text"
          placeholder="Enter Your Username"
          className="rounded-xl p-3"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex gap-3 flex-col w-full ">
        <label className="text-lg font-semibold">Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          className="rounded-xl p-3"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleLogin}
        className="p-3 text-white bg-slate-700 rounded-xl w-full"
      >
        Login
      </button>
    </section>
  );
};

export default LoginComponent;
