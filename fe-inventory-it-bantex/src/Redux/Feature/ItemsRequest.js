import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../apis/api";

const initialState = {
  allData: [],
  needApproved: [],
  needApproved2: [],
  approved: [],
  approved2: [],
  loading: false,
  error: null,
};

export const fetchAllData = createAsyncThunk("data/fetchAllData", async () => {
  const response = await AxiosInstance.get("/form");
  return response.data.data;
});

export const fetchNeedApproved = createAsyncThunk(
  "data/fetchNeedApproved",
  async (username) => {
    const response = await AxiosInstance.get(
      `form/status/Diajukan/approved_1/${username}`
    );
    return response.data.data;
  }
);

export const fetchNeedApproved2 = createAsyncThunk(
  "data/fetchNeedApproved2",
  async (username) => {
    const response = await AxiosInstance.get(
      `form/status/Disetujui1/approved_2/${username}`
    );
    return response.data.data;
  }
);

export const fetchApproved = createAsyncThunk(
  "data/fetchApproved",
  async (username) => {
    const response = await AxiosInstance.get(
      `form/data?approved_1=${username}`
    );
    return response.data.data;
  }
);

export const fetchApproved2 = createAsyncThunk(
  "data/fetchApproved2",
  async (username) => {
    const response = await AxiosInstance.get(
      `form/data?approved_2=${username}`
    );
    return response.data.data;
  }
);

// export const fetchDataDetailPengajuan = createAsyncThunk(
//   "data/fetchDataDetailPengajuan",
//   async (id_item_req) => {
//     const response = await AxiosInstance.get(`pengajuan/form/${id_item_req}`);
//     return response.data.data;
//   }
// );

const dataSliceItemReq = createSlice({
  name: "dataSliceItemReq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.allData = action.payload;
        state.loading = false;
      })
      // Butuh Persejuan Admin
      .addCase(fetchNeedApproved.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNeedApproved.fulfilled, (state, action) => {
        state.needApproved = action.payload;
        state.loading = false;
      })
      // (Butuh Persetujuan Managers)
      .addCase(fetchNeedApproved2.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNeedApproved2.fulfilled, (state, action) => {
        state.needApproved2 = action.payload;
        state.loading = false;
      })
      // Approved 1 (IT / Admin)
      .addCase(fetchApproved.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApproved.fulfilled, (state, action) => {
        state.approved = action.payload;
        state.loading = false;
      })
      // Approved 2 (Manager)
      .addCase(fetchApproved2.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApproved2.fulfilled, (state, action) => {
        state.approved2 = action.payload;
        state.loading = false;
      });
    // .addCase(fetchDataDetailPengajuan.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchDataDetailPengajuan.fulfilled, (state, action) => {
    //   state.dataDetailPengajuan = action.payload;
    //   state.loading = false;
    //   state.error = null;
    // })
    // .addCase(fetchDataDetailPengajuan.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default dataSliceItemReq.reducer;

// Dalam komponen Anda, Anda dapat mengakses data ini dari Redux Store.
// Misalnya, untuk mengakses allData:
// const allData = useSelector((state) => state.data.allData);
