// stockSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

export const fetchNamePt = createAsyncThunk("stocks/fetchNamePt", async () => {
  const response = await AxiosInstance.get("/app");
  return response.data.data;
});

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    data: [],
  },
  reducers: {
    setStockNo: (state, action) => {
      state.stockNo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNamePt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNamePt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchNamePt.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export reducer
export default stockSlice.reducer;
