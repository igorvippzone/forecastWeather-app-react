import React from "react";
import Button from "../../UI/Button/Button";
import { FaMoon, FaSun } from "react-icons/fa";

import styles from "./SwitchThemeButton.module.css";
import { themeActions } from "../../../store/theme-slice";
import { useDispatch, useSelector } from "react-redux";

const SwitchThemeButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const { isLight } = theme;

  const switchThemeHandler = () => {
    dispatch(themeActions.switchTheme());
  };

  return (
    <div className={styles["switch-theme"]}>
      <Button onClick={switchThemeHandler} className={styles["button"]}>
        {isLight ? <FaMoon /> : <FaSun />}
      </Button>
    </div>
  );
};

export default SwitchThemeButton;
