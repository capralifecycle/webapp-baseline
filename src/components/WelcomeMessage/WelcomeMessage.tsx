import * as React from "react";
import { getConfig } from "../../utils/config-utils";
import styles from "./WelcomeMessage.module.css";

interface Props {
  appName?: string;
}

const WelcomeMessage: React.FC<Props> = ({
  appName = __BUILD_INFO__.appName,
}) => {
  const config = getConfig();

  const appBuildTime = __BUILD_INFO__.appBuildTime;
  const commitHash = __BUILD_INFO__.commitHash;

  return (
    <div className={styles.container}>
      <div>
        Welcome to <span className={styles.highlight}>{appName}</span>
      </div>
      <div>Built {appBuildTime}</div>
      <div>Commit hash: {commitHash}</div>
      <div>Current environment {config.environment}</div>
    </div>
  );
};

export default WelcomeMessage;
