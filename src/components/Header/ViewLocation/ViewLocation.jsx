import React from "react";
import styles from "./ViewLocation.module.css";

const ViewLocation = ({ city = "Определяю город..." }) => {
  return <h1 className={styles["view-location"]}>{city}</h1>;
};

export default ViewLocation;
