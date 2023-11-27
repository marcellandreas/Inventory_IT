import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

// Async Actions
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await AxiosInstance.get("/categories");
      const categories = response.data?.data.map((item) => item.category);
      return categories;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDataCategories = createAsyncThunk(
  "categories/fetchDataCategories",
  async () => {
    try {
      const response = await AxiosInstance.get("/categories");
      const categories = response.data.data;
      return categories;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCategoriesId = createAsyncThunk(
  "categories/fetchCategoriesId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`/categories/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Redux Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    categories: [],
    categoriesId: {},
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
      // Fetch Data Categories
      .addCase(fetchDataCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDataCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDataCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Fetch Categories
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
      // Fetch Categories by ID
      .addCase(fetchCategoriesId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categoriesId = action.payload;
      })
      .addCase(fetchCategoriesId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export Reducer
export default categoriesSlice.reducer;
