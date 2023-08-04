import * as React from "react";
import styles from "./Button.module.css";

interface Props {
  intent?: "default" | "primary" | "success" | "warning" | "danger";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({ intent = "default", onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={[styles.btn, styles[intent]].join(" ")}
    >
      {children}
    </button>
  );
};

export default Button;
