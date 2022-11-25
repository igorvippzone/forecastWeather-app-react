import React from "react";
import { useSelector } from "react-redux";

import { dateFormat, weekDay } from "../../helpers";
import Forecast from "../Forecast/Forecast";
import Card from "../UI/Card/Card";
import Loader from "../UI/Loader/Loader";

const ForecastDay = ({ weatherIcon, description, temp, time }) => {
  const { isLoading } = useSelector((state) => state.forecastWeather);

  return (
    <Card>
      {isLoading ? (
        <Loader />
      ) : (
        <Forecast
          title={weekDay(time)}
          date={dateFormat(time)}
          temp={temp}
          description={description}
          iconName={weatherIcon}
        />
      )}
    </Card>
  );
};

export default ForecastDay;
