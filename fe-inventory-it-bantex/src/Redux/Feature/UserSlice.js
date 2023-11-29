// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

// Buat async thunk untuk mengambil data pengguna
export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async () => {
    const response = await AxiosInstance.get("/users");
    return response.data.data;
  }
);
export const fetchProfile = createAsyncThunk("users/fetchProfile", async () => {
  const profile = await AxiosInstance.get("auth/profile");
  return profile.data;
});

// const profile = await AxiosInstance.get("auth/profile", {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
// console.log(profile);

export const fetchLoginHistory = createAsyncThunk(
  "users/fetchLoginHistory",
  async () => {
    const response = await AxiosInstance.get("/auth/history");
    return response.data;
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async ({ id, data, dispatch }) => {
    try {
      const response = await AxiosInstance.put(`/auth/user/${id}`, data);
      dispatch(fetchUserData());
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    admins: [],
    users: [],
    managers: [],
    allData: [],
    profile: [],
    dataLoginHistory: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // profile page
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admins = action.payload.filter((user) => user.role === "1");
        state.users = action.payload.filter((user) => user.role === "2");
        state.managers = action.payload.filter((user) => user.role === "3");
        state.allData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // ...
      .addCase(fetchLoginHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoginHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataLoginHistory = action.payload;
      })
      .addCase(fetchLoginHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //...
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
