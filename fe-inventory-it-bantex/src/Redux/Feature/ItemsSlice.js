// itemsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  dataById: {
    item_no: "",
    item_description: "",
    unit: "",
    category: "",
    brand: "",
    status: "",
    kondisi: "",
    item_location: "",
    note: "",
    date_registration: "",
    date_expired: "",
    item_specification: "",
  },
};

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await AxiosInstance.get("/items");
  return response.data.data;
});

export const createItem = createAsyncThunk(
  "items/createItem",
  async (data, { dispatch }) => {
    const response = await AxiosInstance.post("/items", data);
    dispatch(fetchItems());
    return response.data;
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id) => {
    const response = await AxiosInstance.get(`/items/by/${id}`);
    return response.data.data;
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ id, data }) => {
    try {
      const response = await AxiosInstance.patch(`/items/${id}`, data);
      return response.data;
    } catch (error) {
      throw error; // Lempar error jika terjadi kesalahan
    }
  }
);

export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
  const response = await AxiosInstance.delete(`/items/${id}`);
  return response.data;
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Terjadi kesalahan dalam memproses data";
      })
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state) => {
        state.isLoading = false; // Setelah berhasil membuat item, atur isLoading ke false
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Terjadi kesalahan dalam memproses data";
      })
      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.dataById = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Terjadi kesalahan dalam memproses data";
      })
      // edit
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Terjadi kesalahan dalam memproses data";
      })
      // Delete
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; // Atur pesan kesalahan dari action error
      });
  },
});

export default itemsSlice.reducer;
