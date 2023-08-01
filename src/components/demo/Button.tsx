import * as React from "react";
import styles from "./Button.module.css";

interface Props {
  children?: React.ReactNode;
  intent?: "default" | "primary" | "success" | "warning" | "danger";
}

const Button: React.FC<Props> = ({ intent = "default", children }) => {
  return (
    <button className={[styles.btn, styles[intent]].join(" ")}>
      {children}
    </button>
  );
};

export default Button;
