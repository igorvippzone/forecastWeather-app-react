import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchAddressData } from "../../../store/forecastWeather-slice.js";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

import styles from "./SearchPanel.module.css";

const SearchPanel = () => {
  const InputRef = useRef();

  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    const enteredInput = InputRef.current.value.trim();
    if (enteredInput) {
      dispatch(
        fetchAddressData({
          name: enteredInput,
          lat: null,
          lon: null,
        })
      );

      InputRef.current.value = "";
    }
  };
  return (
    <form onSubmit={searchHandler} className={styles["search-panel"]}>
      <Input ref={InputRef} label="Введите название города" />
      <Button className={styles.button}>Посмотреть погоду</Button>
    </form>
  );
};

export default SearchPanel;
