// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    role: "",
    id_user: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.id_user = action.payload.id_user;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
