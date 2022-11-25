import React, { createElement } from "react";
import * as WeatherIcons from "react-icons/wi";

const WeatherIcon = ({ iconName, ...props }) => {
  return <>{createElement(WeatherIcons[iconName],{...props})}</>;
};

export default WeatherIcon;
