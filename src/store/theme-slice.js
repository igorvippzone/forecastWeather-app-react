import { createSlice } from "@reduxjs/toolkit";

const localTheme = localStorage.getItem("isLightTheme")

const initialTheme = { isLight: localTheme ? JSON.parse(localTheme) :true };


const themeSlice = createSlice({
  name: "theme",
  initialState: initialTheme,
  reducers: {
    switchTheme(state) {
      state.isLight = !state.isLight;
      localStorage.setItem("isLightTheme", state.isLight);
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
