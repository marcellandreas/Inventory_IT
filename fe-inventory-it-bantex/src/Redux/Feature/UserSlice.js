// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataAllUser: [],
  databyRole: [],
  loadingAuth: true,
  username: "",
  role: "",
  id_user: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.id_user = action.payload.id_user;
    },
    setAllDataUser: (state, action) => {
      state.dataAllUser = action.payload;
    },
    setDatabyRole: (state, action) => {
      state.databyRole = action.payload;
    },
    setLoadingAuth: (state, action) => {
      state.loadingAuth = action.payload;
    },
  },
});

export const { setUserData, setAllDataUser, setDatabyRole, setLoadingAuth } =
  userSlice.actions;

export default userSlice.reducer;
