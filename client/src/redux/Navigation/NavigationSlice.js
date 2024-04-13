import { createSlice } from "@reduxjs/toolkit";
const NavigationSlice = createSlice({
  name: "navigation",
  initialState: {
    openPage: "",
    loading: false,
  },
  reducers: {
    navigationStart: (state) => {
      state.loading = true;
    },
    navigationSuccess: (state, action) => {
      state.openPage = action.payload;
      state.loading = false;
    },
    navigationComplete: (state) => {
      state.loading = false;
    },
  },
});
export const { navigationStart, navigationSuccess, navigationComplete } =
  NavigationSlice.actions;
export default NavigationSlice.reducer;
