// stockSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";
import { validateFormDataStock } from "../../config/ValidateForm";

// Membuat asynchronous action untuk mengambil data stocks
export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await AxiosInstance.get("/stocks");
  return response.data.data;
});

export const fetchStockNumbers = createAsyncThunk(
  "stocks/fetchStockNumbers",
  async () => {
    const response = await AxiosInstance.get("/stocks/no");
    return response.data.data;
  }
);

export const fetchStockByNo = createAsyncThunk(
  "stock/fetchStockByNo",
  async (stockNo) => {
    try {
      const response = await AxiosInstance.get(`/stocks/stock/${stockNo}`);
      return response.data.stock;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await AxiosInstance.get("/categories");
      const categories = response.data.map((item) => item.category);
      return categories;
    } catch (error) {
      throw error;
    }
  }
);

export const createStock = createAsyncThunk(
  "stock/createStock",
  async (formValues, { dispatch }) => {
    try {
      const response = await AxiosInstance.post("/stocks", formValues);
      dispatch(fetchStocks()); // Dispatch tindakan lain jika perlu
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Get by id
export const fetchStockById = createAsyncThunk(
  "stock/fetchStockById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`/stocks/id/${id}`);
      return response.data.stock;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT
export const updateStock = createAsyncThunk(
  "stocks/updateStock",
  async (data) => {
    try {
      const response = await AxiosInstance.put(
        `/stocks/${data.id}`,
        data.formValues
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Membuat slice Redux
const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    data: [],
    dataGetStockNo: [],
    databyStockNo: [],
    categories: [],
    dataStockById: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setStockNo: (state, action) => {
      state.stockNo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // stock no
      .addCase(fetchStockNumbers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStockNumbers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataGetStockNo = action.payload;
      })
      .addCase(fetchStockNumbers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStockByNo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStockByNo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.databyStockNo = action.payload;
        state.error = null;
      })
      .addCase(fetchStockByNo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // POST
      .addCase(createStock.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStock.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createStock.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // GET ID
      .addCase(fetchStockById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStockById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.dataStockById = action.payload;
      })
      .addCase(fetchStockById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Put
      .addCase(updateStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStock.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export action creator
export const { setStockNo } = stockSlice.actions;

// Export reducer
export default stockSlice.reducer;
