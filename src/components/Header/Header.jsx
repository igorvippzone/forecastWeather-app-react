import React from "react";
import { useSelector } from "react-redux";

import Card from "../UI/Card/Card";
import styles from "./Header.module.css";
import ViewLocation from "./ViewLocation/ViewLocation";
import SearchPanel from "./SearchPanel/SearchPanel";
import SwitchThemeButton from "./SwitchThemeButton/SwitchThemeButton";
import FullLocation from "./FullLocation/FullLocation";

const Header = () => {
  const { isLoading, location } = useSelector((state) => state.forecastWeather);

  let content = "";
  if (isLoading) {
    content = "Идёт загрузка...";
  } else {
    content = {
      fullNamePlace: location.fullNamePlace,
      city: location.city,
    };
  }

  return (
    <Card>
      <header className={styles.header}>
        <FullLocation fullNamePlace={content.fullNamePlace} />
        <ViewLocation city={content.city} />
        <SearchPanel />
        <SwitchThemeButton />
      </header>
    </Card>
  );
};

export default Header;
