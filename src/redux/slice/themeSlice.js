import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light", //default theme
  reducers: {
    toggleTheme(state) {
      return state === "light" ? "dark" : "light"; //switch theme
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
