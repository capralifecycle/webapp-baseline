import * as React from "react";
import styles from "./Center.module.css";

interface Props {
  children?: React.ReactNode;
}

const Center: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.centerOuter}>
      <div className={styles.centerInner}>{children}</div>
    </div>
  );
};

export default Center;
