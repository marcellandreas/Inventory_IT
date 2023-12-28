import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

const initialState = {
  data: [],
  dataById: {},
  isLoading: false,
  error: null,
};

export const fetchReqSub = createAsyncThunk("form/fetchReqSub", async () => {
  const response = await AxiosInstance.get("/form");
  return response.data.data;
});

export const fetchFormDataReqSubById = createAsyncThunk(
  "form/fetchData",
  async (id) => {
    const response = await AxiosInstance.get(`/form/id/${id}`);
    return response.data.data;
  }
);

export const deleteDataReqSub = createAsyncThunk(
  "form/deleteDataReqSub",
  async (id, { dispatch }) => {
    try {
      await AxiosInstance.delete(`form/${id}`);
      dispatch(fetchReqSub); // Memuat ulang data setelah penghapusan
    } catch (error) {
      throw new Error("Gagal Menghapus stok");
    }
  }
);

const reqSubSlice = createSlice({
  name: "reqSub",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReqSub.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReqSub.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchReqSub.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Terjadi kesalahan dalam memproses data";
      })
      // get data by id
      .addCase(fetchFormDataReqSubById.pending, (state) => {
        state.isLoading = true; // Set isLoading menjadi true saat request dimulai
      })
      .addCase(fetchFormDataReqSubById.fulfilled, (state, action) => {
        state.isLoading = false; // Set isLoading menjadi false saat request berhasil
        state.dataById = action.payload;
      })
      .addCase(fetchFormDataReqSubById.rejected, (state, action) => {
        state.isLoading = false; // Set isLoading menjadi false saat request ditolak
        state.error = action.error.message;
      })
      // delete data by id
      .addCase(deleteDataReqSub.pending, (state) => {
        state.isLoading = true; // Set isLoading menjadi true saat penghapusan dimulai
      })
      .addCase(deleteDataReqSub.fulfilled, (state, action) => {
        state.isLoading = false; // Set isLoading menjadi false saat penghapusan berhasil
      })
      .addCase(deleteDataReqSub.rejected, (state) => {
        state.isLoading = false; // Set isLoading menjadi false saat penghapusan ditolak
      });
  },
});

export default reqSubSlice.reducer;
