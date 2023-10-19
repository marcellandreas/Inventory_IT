// LoginForm.js
import React, { useState } from "react";
import { AxiosInstance } from "../../../apis/api";
import { setAuthToken } from "../../../config/Auth";
import Form from "../../molecules/Form";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../Redux/Feature/UserSlice";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

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

      dispatch(setUserData({ username: username_, role, id_user }));

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
    <Form
      onSubmit={handleLogin}
      className="flex flex-col gap-5 w-80 justify-center items-center bg-slate-300 p-5 rounded-xl "
    >
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
          required
        />
      </div>
      <div className="flex gap-3 flex-col w-full ">
        <label className="text-lg font-semibold">Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          className="rounded-xl p-3"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="p-3 text-white bg-slate-700 rounded-xl w-full"
      >
        Login
      </button>
    </Form>
  );
};

export default LoginForm;
