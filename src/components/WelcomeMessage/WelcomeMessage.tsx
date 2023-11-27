import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./WelcomeMessage.module.css";
import { getConfig } from "../../utils/config-utils";

interface Props {
  appName?: string;
  appBuildTime?: string;
  commitHash?: string;
}

const WelcomeMessage: React.FC<Props> = ({
  appName = __BUILD_INFO__.appName,
  appBuildTime = __BUILD_INFO__.appBuildTime,
  commitHash = __BUILD_INFO__.commitHash,
}) => {
  const config = getConfig();

  return (
    <div className={styles.container}>
      <h1 id="welcome-message">
        Welcome to <span className={styles.highlight}>{appName}</span>.
      </h1>
      <p data-testid="version-info">
        Built {appBuildTime} from commit {commitHash} and is running in{" "}
        {config.environment}
      </p>
      <p>
        <Link to="/about/details">Details</Link>
      </p>
    </div>
  );
};

export default WelcomeMessage;
