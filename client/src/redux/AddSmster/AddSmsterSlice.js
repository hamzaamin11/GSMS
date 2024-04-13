import { createSlice, current } from "@reduxjs/toolkit";
const AddSmsterSlice = createSlice({
  name: "transcript",
  initialState: {
    Semesters: [], //yh b nai yh nichy semester b kidr gya?
    Semester: {}, // tuwadey to zyada pareshan main va....haaha
    error: null,
    coursesError: {},
    document: {},
    loading: false,
  },
  reducers: {
    AddSemesterStart: (state) => {
      state.loading = true;
    },
    AddSemesterSuccess: (state, action) => {
      state.loading = false;
      console.log("State:", current(state));
      state.Semesters.push(action.payload);
    },
    AddSemesterFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteSemesterStart: (state, action) => {
      state.loading = true;
    },
    deleteSemester: (state, action) => {
      // console.log("deleteSemester -> action.payload:", action.payload);
      state.loading = false;
      state.Semesters = state.Semesters.filter(
        (semester) => semester._id !== action.payload
      );
    },
    deleteSemesterComplete: (state, action) => {
      state.loading = false;
    },
    SemesterGet: (state, action) => {
      state.Semester = action.payload;
    },
    uploadFileStart: (state) => {
      state.loading = true;
    },
    uploadFileSuccess: (state, action) => {
      state.document = action.payload;
      state.loading = false;
    },
    uploadFileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const {
  AddSemesterStart,
  AddSemesterSuccess,
  AddSemesterFailure,
  deleteSemesterStart,
  deleteSemester,
  deleteSemesterComplete,
  SemesterGet,
  uploadFileStart,
  uploadFileSuccess,
  uploadFileFailure,
} = AddSmsterSlice.actions;
export default AddSmsterSlice.reducer;
