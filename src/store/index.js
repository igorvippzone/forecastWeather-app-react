import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./theme-slice";
import forecastWeatherReducer from "./forecastWeather-slice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    forecastWeather: forecastWeatherReducer,
  },
});

export default store;
