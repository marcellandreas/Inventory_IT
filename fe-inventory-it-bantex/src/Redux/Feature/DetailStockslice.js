import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

const initialState = {
  data: [],
  dataDetailStockNo: [],
  dataDetailStockNoAbove1: [],
  dataDetailId: null,
  isLoading: false,
  error: null,
  status: "idle",
};

export const fetchDetailStock = createAsyncThunk(
  "stock/fetchDetailStock",
  async () => {
    const response = await AxiosInstance.get("/det-stock");
    return response.data.data;
  }
);

// Get All Data Detail Stock by No stock
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

// Get All Data Detail Stock by No stock
export const fetchQtyStockAboveOne = createAsyncThunk(
  "stock/fetchQtyStockAboveOne",
  async (stockNo) => {
    try {
      const response = await AxiosInstance.get(`det-stock/qty/${stockNo}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

// Get Data detail Stocks by id
export const fetchStockDetailsByid = createAsyncThunk(
  "detailStock/fetchDetailStock",
  async (idDetailStock) => {
    try {
      const res = await AxiosInstance.get(`det-stock/id/${idDetailStock}`);
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
);

// update qty multiple minus
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

// update qty multiple plus
export const updatePlusQtyDetails = createAsyncThunk(
  "detailStock/updatePlusQtyMultiple",
  async (dataDetailPost, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put(
        "/det-stock/update-plus",
        dataDetailPost
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// post detail stock
export const postDetailData = createAsyncThunk(
  "detail/postDetailData",
  async (dataDetailPost, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/det-stock", dataDetailPost);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const stockSlice = createSlice({
  name: "detailStock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchDetailsStock
      .addCase(fetchDetailStock.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDetailStock.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchDetailStock.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Terjadi kesalahan dalam memproses data";
      })
      // fetchStockDetails
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
      })
      //fetchStockDetailById
      .addCase(fetchStockDetailsByid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStockDetailsByid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataDetailId = action.payload;
      })
      .addCase(fetchStockDetailsByid.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // fecth Stock Detail Above 1
      .addCase(fetchQtyStockAboveOne.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQtyStockAboveOne.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataDetailStockNoAbove1 = action.payload;
      })
      .addCase(fetchQtyStockAboveOne.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // updateMultipleDetails
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
      })
      // updatePlusQtyDetails
      .addCase(updatePlusQtyDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePlusQtyDetails.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updatePlusQtyDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // postDetailStock
      .addCase(postDetailData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postDetailData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(postDetailData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default stockSlice.reducer;
