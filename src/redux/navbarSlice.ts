import { createSlice } from "@reduxjs/toolkit";
import type { NavbarState } from "./api/types";

const initialState: NavbarState = {
  isOpen: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Action creators are generated for each case reducer function

export const { toggle } = navbarSlice.actions;
export default navbarSlice.reducer;
