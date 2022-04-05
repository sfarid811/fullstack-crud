import { createSlice } from "@reduxjs/toolkit";


const darkmodeStatus = typeof window !== 'undefined' ? localStorage.getItem('theme') : null


export const themeMode = createSlice({
  name: "themeMode",
  initialState: {
    value: darkmodeStatus,
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDarkMode } = themeMode.actions;

export default themeMode.reducer;