import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

const initialState = {
  dataDetailStockNo: [],
  isLoading: false,
  error: null,
};

export const fetchStockDetails = createAsyncThunk(
  "stock/fetchStockDetails",
  async (stockNo) => {
    try {
      const response = await AxiosInstance.get(`det-stock/no/${stockNo}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const stockSlice = createSlice({
  name: "detailStock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStockDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataDetailStockNo = action.payload;
        state.error = null;
      })
      .addCase(fetchStockDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default stockSlice.reducer;
