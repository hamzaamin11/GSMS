import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    error: null,
    loading: false,
    token: null,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signUpStart: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
    signOut: (state, action) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});
export const {
  signInStart,
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpStart,
  signUpSuccess,
  addToken,
  signOut,
} = userSlice.actions;
export default userSlice.reducer;
