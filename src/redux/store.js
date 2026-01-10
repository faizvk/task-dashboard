import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slice/taskSlice";
import themeReducer from "./slice/themeSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
  },
});
