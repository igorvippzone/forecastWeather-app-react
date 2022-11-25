import React from "react";
import { useSelector } from "react-redux";

import ForecastDay from "../ForecastDay/ForecastDay";
import ForecastToday from "../ForecastToday/ForecastToday";

import styles from "./Main.module.css";

const Main = () => {
  const { forecast } = useSelector((state) => state.forecastWeather);
  const daily = forecast.daily;

  return (
    <main className={styles.main}>
      {daily.map((day, i) => {
        if (i === 0) {
          return <ForecastToday key={day.id ? day.id : i} {...day} />;
        }
        return <ForecastDay key={day.id ? day.id : i} {...day} />;
      })}
    </main>
  );
};

export default Main;
