import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: initialTheme,
  reducers: {
    //toggle theme
    toggleTheme(state) {
      const next = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", next); //persist theme
      return next;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
