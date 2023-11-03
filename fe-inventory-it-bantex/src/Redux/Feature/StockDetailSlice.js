// detailStockSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

export const updateMultipleDetails = createAsyncThunk(
  "detailStock/updateMultiple",
  async (dataDetailPost, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(
        "/det-stock/update-multiple",
        dataDetailPost
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const detailStockSlice = createSlice({
  name: "detailStock",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMultipleDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateMultipleDetails.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateMultipleDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default detailStockSlice.reducer;
