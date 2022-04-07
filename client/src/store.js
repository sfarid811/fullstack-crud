import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todoSlice";
import darkReducer from "./features/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    // dark: darkReducer
  },
});
