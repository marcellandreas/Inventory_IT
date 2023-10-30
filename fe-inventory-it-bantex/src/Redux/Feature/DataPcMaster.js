import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

// Membuat fungsi asinkron untuk mengambil data dari API
export const fetchPcMasterData = createAsyncThunk(
  "pcmaster/fetchData",
  async () => {
    try {
      const response = await AxiosInstance.get("/pcmaster");
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchItemsUnusedForPcMaster = createAsyncThunk(
  "unusedItems/fechtData",
  async () => {
    try {
      const response = await AxiosInstance.get("/items/unused");
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fechtPcLineData = createAsyncThunk(
  "pcline/fetchData",
  async () => {
    try {
      const response = await AxiosInstance.get("/pcline");
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createPcLine = createAsyncThunk(
  "pcline/create",
  async (dataPost, { dispatch }) => {
    try {
      const response = await AxiosInstance.post("/pcline", dataPost);
      alert("Berhasil Menambah Komponets");
      dispatch(fechtPcLineData()); // Memicu pembaruan data setelah berhasil membuat komponen
      return response;
    } catch (error) {
      alert("Gagal Menambah Komponents");
      throw error;
    }
  }
);

// Membuat slice Redux Toolkit
const pcmasterSlice = createSlice({
  name: "pcmaster",
  initialState: {
    dataPcmaster: [],
    dataUnused: [],
    dataPcLine: [],
    loadingPcMaster: false,
    loadingItemsUnused: false,
    loadingPcLine: false,
    errorPcMaster: null,
    errorItemsUnused: null,
    errorPcLine: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPcMasterData.pending, (state) => {
        state.loadingPcMaster = true;
      })
      .addCase(fetchPcMasterData.fulfilled, (state, action) => {
        state.loadingPcMaster = false;
        state.dataPcmaster = action.payload;
      })
      .addCase(fetchPcMasterData.rejected, (state, action) => {
        state.loadingPcMaster = false;
        state.errorPcMaster = action.error.message;
      })
      // ...
      .addCase(fetchItemsUnusedForPcMaster.pending, (state) => {
        state.loadingItemsUnused = true;
      })
      .addCase(fetchItemsUnusedForPcMaster.fulfilled, (state, action) => {
        state.loadingItemsUnused = false;
        state.dataUnused = action.payload;
      })
      .addCase(fetchItemsUnusedForPcMaster.rejected, (state, action) => {
        state.loadingItemsUnused = false;
        state.errorItemsUnused = action.error.message;
      })
      // ...
      .addCase(fechtPcLineData.pending, (state) => {
        state.loadingPcLine = true;
      })
      .addCase(fechtPcLineData.fulfilled, (state, action) => {
        state.loadingPcLine = false;
        state.dataPcLine = action.payload;
      })
      .addCase(fechtPcLineData.rejected, (state, action) => {
        state.loadingPcLine = false;
        state.errorPcLine = action.error.message;
      }) // ...
      .addCase(createPcLine.pending, (state) => {
        state.loadingPcLine = true;
      })
      .addCase(createPcLine.fulfilled, (state) => {
        state.loadingPcLine = false;
      })
      .addCase(createPcLine.rejected, (state) => {
        state.loadingPcLine = false;
      });
  },
});

export default pcmasterSlice.reducer;
