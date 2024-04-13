import { createSlice } from "@reduxjs/toolkit";
const SubmitApplicationsSlice = createSlice({
  name: "application",
  initialState: {
    data: null,
    totalRecords: null,
    currentPageRecords: null,
    totalPages: null,
    loading: false,
  },
  reducers: {
    fetchingDataStart: (state, action) => {
      state.loading = true;
    },
    fetchingDataSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchingTotalRecords: (state, action) => {
      state.totalRecords = action.payload;
      state.loading = false;
    },
    fetchingTotalPages: (state, action) => {
      state.totalPages = action.payload;
      state.loading = false;
    },
    fetchingCurrentPageRecords: (state, action) => {
      state.currentPageRecords = action.payload;
      state.loading = false;
    },
  },
});
export const {
  fetchingDataStart,
  fetchingDataSuccess,
  fetchingTotalPages,
  fetchingCurrentPageRecords,
  fetchingTotalRecords,
} = SubmitApplicationsSlice.actions;
export default SubmitApplicationsSlice.reducer;
