import * as React from "react";
import styles from "./Card.module.css";

interface Props {
  children?: React.ReactNode;
  intent?: "default" | "primary" | "success" | "warning" | "danger";
  height?: number;
  width?: number;
}

const Card: React.FC<Props> = ({
  intent = "default",
  children,
  height,
  width,
}) => {
  return (
    <div
      className={[styles.card, styles[intent]].join(" ")}
      style={{ height, width }}
    >
      {children}
    </div>
  );
};

export default Card;
