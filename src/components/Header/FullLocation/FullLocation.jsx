import styles from "./FullLocation.module.css";

const FullLocation = ({ fullNamePlace }) => {
  return <p className={styles.text}>{fullNamePlace || "Не найдено"}</p>;
};

export default FullLocation;
