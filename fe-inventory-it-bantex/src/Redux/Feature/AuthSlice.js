// src/features/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    role: "",
    codeUser: "",
    idUser: "",
    username: "",
    email: "",
    fullName: "",
  },
  reducers: {
    setAuthData: (state, action) => {
      const {
        token,
        role,
        code_user: codeUser,
        id_user: idUser,
        username: username_,
        email,
        full_name: fullName,
      } = action.payload;

      state.token = token;
      state.role = role;
      state.codeUser = codeUser;
      state.idUser = idUser;
      state.username = username_;
      state.email = email;
      state.fullName = fullName;
    },
    clearAuthData: (state) => {
      state.token = "";
      state.role = "";
      state.codeUser = "";
      state.idUser = "";
      state.username = "";
      state.email = "";
      state.fullName = "";
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
