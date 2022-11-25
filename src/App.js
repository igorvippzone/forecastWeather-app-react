import Header from "./components/Header/Header";

import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import Main from "./components/Main/Main";
import Loader from "./components/UI/Loader/Loader";
import { useEffect } from "react";
import { fetchAddressData } from "./store/forecastWeather-slice";

function App() {
  const { isLight } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  console.count("app");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });

    function success({ coords }) {
      const { latitude, longitude } = coords;
      dispatch(
        fetchAddressData({
          lat: latitude,
          lon: longitude,
        })
      );
    }

    function error({ message }) {
      dispatch(fetchAddressData({}));
    }
  }, [dispatch]);

  return (
    <div className={`${styles.app} ${isLight ? styles.light : styles.dark}`}>
      <Header />
       <Main />
    </div>
  );
}

export default App;
