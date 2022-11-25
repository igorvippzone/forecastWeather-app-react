import React from "react";

import styles from "./Forecast.module.css";
import WeatherIcon from "../UI/WeatherIcon/WeatherIcon";

const Forecast = ({
  title,
  date,
  temp,
  description,
  iconName,
  iconSize,
}) => {
  return (
    <>
      <div className={styles["card-header"]}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.date}>{date}</p>
      </div>
      <div className={styles.temp}>
        <div>{Math.round(temp)}°С</div>
      </div>

      {iconName && (
        <div className={iconSize}>
          <WeatherIcon iconName={iconName} size={150} />
        </div>
      )}
      <p>{description}</p>
    </>
  );
};

export default Forecast;
