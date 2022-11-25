import React from "react";
import { useSelector } from "react-redux";

import { dateFormat, getTime, weekDay } from "../../helpers";
import Forecast from "../Forecast/Forecast";
import Card from "../UI/Card/Card";
import Loader from "../UI/Loader/Loader";
import WeatherIcon from "../UI/WeatherIcon/WeatherIcon";
import styles from "./ForecastToday.module.css";

const ForecastToday = ({
  temp,
  time,
  description,
  weatherIcon,
  sunRise,
  sunSet,
  tempMax,
  tempMin,
  windDirection,
}) => {
  const { isLoading } = useSelector((state) => state.forecastWeather);

  return (
    <Card>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Forecast
            title={"Сегодня " + weekDay(time)}
            iconSize={styles.sizeSvg}
            iconName={weatherIcon}
            date={dateFormat(time)}
            temp={temp}
            description={description}
          />

          <div className={styles["wind-direction"]}>
            <span></span>
            <span></span>
            <WeatherIcon
              style={{ transform: `rotate(${windDirection}deg)` }}
              iconName={"WiWindDeg"}
              size={60}
            />
          </div>

          <div className={styles["forecast-description"]}>
            <div className={styles["temp-group"]}>
              <div className={styles["temp-item"]}>
                <p className={styles["temp-label"]}>Min</p>
                <p className={styles["temp-value"]}>{Math.round(tempMin)}</p>
              </div>
              <div className={styles["temp-item"]}>
                <p className={styles["temp-label"]}>Max</p>
                <p className={styles["temp-value"]}>{Math.round(tempMax)}</p>
              </div>
            </div>

            <div className={styles["temp-group"]}>
              <div className={styles["temp-item"]}>
                <p className={styles["temp-label"]}>Восход</p>
                <p className={styles["temp-value"]}>{getTime(sunRise)}</p>
              </div>
              <div className={styles["temp-item"]}>
                <p className={styles["temp-label"]}>Заход</p>
                <p className={styles["temp-value"]}>{getTime(sunSet)}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default ForecastToday;
