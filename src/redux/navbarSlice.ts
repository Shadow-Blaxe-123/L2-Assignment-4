import { createSlice } from "@reduxjs/toolkit";
import type { NavbarState } from "./api/types";

const initialState: NavbarState = {
  isOpen: false,
  borrowSummaryDialogState: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    borrowSummaryDialog: (state) => {
      state.borrowSummaryDialogState = !state.borrowSummaryDialogState;
    },
  },
});

// Action creators are generated for each case reducer function

export const { toggle, borrowSummaryDialog } = navbarSlice.actions;
export default navbarSlice.reducer;
