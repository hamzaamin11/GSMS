import { createSlice } from "@reduxjs/toolkit";
const applicationSlice = createSlice({
  name: "application",
  initialState: {
    application: null,
    loading: false,
    commentLoading: false,
  },
  reducers: {
    addApplicationStart: (state) => {
      state.loading = true;
    },
    addApplicationData: (state, action) => {
      state.application = action.payload;
      state.loading = false;
    },
  },
});
export const { addApplicationStart, addApplicationData } =
  applicationSlice.actions;
export default applicationSlice.reducer;
