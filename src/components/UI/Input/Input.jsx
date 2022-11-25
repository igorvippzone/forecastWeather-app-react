import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef(({ label, id }, ref) => {
  return (
    <div className={styles["custom-input"]}>
      <input ref={ref} type="text" id={id} placeholder={label} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
});

export default Input;
