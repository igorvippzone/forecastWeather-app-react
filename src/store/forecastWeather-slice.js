import { createSlice } from "@reduxjs/toolkit";
import { weatherMap } from "../api";

const initialForecastWeather = {
  location: {
    fullNamePlace: "",
    city: "",
    lat: null,
    lon: null,
  },
  forecast: {
    daily: [{}, {}, {}, {}, {}, {}, {}],
    data:null
  },
  isLoading: true,
  error: null, //idle,pending,success,error
};

const forecastWeatherSlice = createSlice({
  name: "forecastWeather",
  initialState: initialForecastWeather,
  reducers: {
    setLocation(state, action) {
      state.location.fullNamePlace = action.payload.fullNamePlace;
      state.location.city = action.payload.city;
      state.location.lat = action.payload.lat;
      state.location.lon = action.payload.lon;
    },

    setForecast(state, action) {
      const daily = [];

      const dataDaily = action.payload.daily;

      for (let i = 0; i < 7; i++) {
        const temp = Math.round(
          (dataDaily.temperature_2m_max[i] + dataDaily.temperature_2m_min[i]) /
            2
        );

        daily.push({
          id: Math.floor(Math.random() * 1000),
          windDirection: dataDaily.winddirection_10m_dominant[i],
          time: dataDaily.time[i],
          weatherCode: dataDaily.weathercode[i],
          tempMax: dataDaily.temperature_2m_max[i],
          tempMin: dataDaily.temperature_2m_min[i],
          sunRise: dataDaily.sunrise[i],
          sunSet: dataDaily.sunset[i],
          temp,
        });
      }

      daily[0].temp = action.payload.currentWeather.temperature;
      daily[0].weatherCode = action.payload.currentWeather.weathercode;

      daily.forEach((item, i, arr) => {
        const wCode = item.weatherCode;

        const elemWeather = weatherMap.find((elem) => {
          return elem.id === wCode;
        });

        arr[i].weatherIcon = elemWeather.iconName;
        arr[i].description = elemWeather.desc;
      });

      state.forecast.daily = daily;
      state.forecast.data = action.payload.data
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },

    setError(state, action) {
      state.error = action.payload.message;
    },
  },
});

export const forecastWeatherActions = forecastWeatherSlice.actions;

export default forecastWeatherSlice.reducer;

export const fetchAddressData = (location) => {
  let { name, lat, lon } = location;
  if (!name && !lat && !lon) {
    lat = "55.755864";
    lon = "37.617698";
  }

  return async (dispatch) => {
    dispatch(forecastWeatherActions.setIsLoading({ isLoading: true }));

    const fetchData = async () => {
      const response = await fetch(
        `https://api.geotree.ru/address.php?${name ? "term=" + name : ""}${
          lat ? "&lat=" + lat : ""
        }${lon ? "&lon=" + lon : ""}&types=address`
      );

      if (!response.ok) {
        throw new Error("Ошибка!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const addressData = await fetchData();

      if (addressData.length !== 0) {
        dispatch(
          fetchForecastData({
            lat: addressData[0]?.geo_center?.lat,
            lon: addressData[0]?.geo_center?.lon,
          })
        );
        dispatch(
          forecastWeatherActions.setLocation({
            fullNamePlace: addressData[0]?.value,
            city: addressData[0]?.place_name,
            lat: addressData[0]?.geo_center?.lat,
            lon: addressData[0]?.geo_center?.lon,
            data: addressData,
          })
        );
      } else {
        dispatch(forecastWeatherActions.setIsLoading({ isLoading: false }));
      }
    } catch (error) {
      console.error("erкor:", error.message);
    } finally {
    }
  };
};

export const fetchForecastData = (location) => {
  let { lat, lon } = location;

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${"latitude=" + lat}&${
          "longitude=" + lon
        }&daily=weathercode,winddirection_10m_dominant,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum&current_weather=true&timezone=Europe%2FMoscow`
      );

      if (!response.ok) {
        throw new Error("Ошибка!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const forecastData = await fetchData();
      if (forecastData.length !== 0) {
        dispatch(
          forecastWeatherActions.setForecast({
            currentWeather: forecastData.current_weather,
            daily: forecastData.daily,
            data: forecastData
          })
        );
      }
    } catch (error) {
      console.error("erкor:", error.message);
    } finally {
      dispatch(forecastWeatherActions.setIsLoading({ isLoading: false }));
    }
  };
};
