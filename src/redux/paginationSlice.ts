import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  limit: 10,
  page: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      state.page -= 1;
    },
    allBooks: (state) => {
      state.page = 1;
    },
  },
});

export const { nextPage, prevPage, allBooks } = paginationSlice.actions;
export default paginationSlice.reducer;
