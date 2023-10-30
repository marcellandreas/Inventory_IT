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

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async ({ id, data }) => {
    try {
      const response = await AxiosInstance.put(`/auth/user/${id}`, data);
      return response.data;
    } catch (error) {
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
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
