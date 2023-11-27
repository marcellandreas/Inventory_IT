import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

export const fetchPt = createAsyncThunk("divAndPt/fetchPt", async () => {
  const response = await AxiosInstance.get("/app");
  return response.data.data;
});

export const fetchPtId = createAsyncThunk(
  "divAndPt/fetchPtId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`/app/pt/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDivision = createAsyncThunk(
  "divAndPt/fetchDivision",
  async (namePt, { dispatch }) => {
    const response = await AxiosInstance.get(`/app/division/${namePt}`);
    return response.data.data;
  }
);

export const fetchDivisionId = createAsyncThunk(
  "divAndPt/fetchDivisionId",
  async (id, { dispatch }) => {
    const response = await AxiosInstance.get(`/app/divId/${id}`);
    console.log(response);
    return response.data.data;
  }
);

const initialState = {
  dataPt: [],
  dataPtId: {},
  dataDivision: [],
  dataDivisionId: {},
  isLoading: false,
};

export const divPtSlice = createSlice({
  name: "divPtSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataPt = action.payload;
      })
      .addCase(fetchPt.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // get pt id
      .addCase(fetchPtId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPtId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataPtId = action.payload;
      })
      .addCase(fetchPtId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //division
      .addCase(fetchDivision.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDivision.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataDivision = action.payload;
      })
      .addCase(fetchDivision.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      //division id
      .addCase(fetchDivisionId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDivisionId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataDivisionId = action.payload;
      })
      .addCase(fetchDivisionId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default divPtSlice.reducer;
